package com.mastercard.mcs.virtualcardtokens.service;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mastercard.developer.encryption.JweEncryption;
import com.mastercard.developer.oauth.OAuth;
import com.mastercard.mcs.virtualcardtokens.constants.AppConstants;
import com.mastercard.mcs.virtualcardtokens.models.CheckoutApiResponse;
import com.mcs.virtualcardtokens.checkout.api.CheckoutApi;
import com.mcs.virtualcardtokens.checkout.invoker.ApiException;
import com.mcs.virtualcardtokens.checkout.model.CheckoutRequest;
import com.mcs.virtualcardtokens.checkout.model.CheckoutResponse;
import com.mcs.virtualcardtokens.checkout.model.CheckoutResponseJWS;
import com.mcs.virtualcardtokens.checkout.model.CheckoutResponseJWSPayload;
import com.mcs.virtualcardtokens.checkout.model.Payload;
import com.nimbusds.jose.JWSObject;

@Service
public class MasterCardVCTCheckoutService extends MasterCardCommonService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final Gson gson = new Gson();

    /*
     * You can use this method to fetch transaction credentials for the selected
     * card from Click to Pay.
     * 
     * Note: This currently does not work as is, due to the limitations of the
     * Mastercard client-encryption library.
     * And the way the Click to Pay Checkout API YAML is structured. Due to this,
     * the other method is being used.
     */
    public CheckoutResponse fetchTransactionCredentials(CheckoutRequest request, String flowId, String responseHost)
            throws IOException, GeneralSecurityException, ApiException {
        CheckoutApi api = new CheckoutApi(getCheckoutApiClient());
        
        return api.postTransactionCredentials(request, flowId, responseHost);
    }

    public ResponseEntity<Object> customFetchTransactionCredentials(
            CheckoutRequest request, String flowId, String responseHost) {

        Map<String, Object> result = new HashMap<>();
        try {
            CheckoutApiResponse checkoutApiResponse = new CheckoutApiResponse();

            String route = production ? productionBaseUrl : sandboxBaseUrl;
            route = route + "/api/digital/payments/transaction/credentials";
            URI uri = new URI(route);

            HttpHeaders requestHttpHeaders = new HttpHeaders();
            requestHttpHeaders.setContentType(MediaType.APPLICATION_JSON);

            if (flowId != null) {
                requestHttpHeaders.add("X-Src-Cx-Flow-Id", flowId);
            }
            if (responseHost != null) {
                requestHttpHeaders.add("X-Src-Response-Host", responseHost);
            }

            String payload = gson.toJson(request);

            String authHeader = OAuth.getAuthorizationHeader(
                    uri,
                    HttpMethod.POST.name(),
                    payload,
                    StandardCharsets.UTF_8,
                    consumerKey,
                    getSigningKey());
            requestHttpHeaders.add(OAuth.AUTHORIZATION_HEADER_NAME, authHeader);

            HttpEntity<String> entity = new HttpEntity<>(payload, requestHttpHeaders);
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(uri, entity, String.class);

            String responseBody = responseEntity.getBody();

            Map<String, Object> checkoutResponseMap = gson.fromJson(responseBody,
                    new TypeToken<Map<String, Object>>() {});

            JWSObject jwsObject = JWSObject.parse(checkoutResponseMap.get("checkoutResponseJWS").toString());
            Map<String, Object> jwsResponsePayload = jwsObject.getPayload().toJSONObject();
            String decryptedPayload = JweEncryption.decryptPayload(gson.toJson(jwsResponsePayload),
                    getDecryptionConfig());

            checkoutApiResponse.setCheckoutResponseJWS(checkoutResponseMap.get("checkoutResponseJWS").toString());
            jwsResponsePayload.put(ENCRYPTED_PAYLOAD, gson.fromJson(decryptedPayload, Payload.class));
            CheckoutResponse checkoutResponse = new CheckoutResponse();
            CheckoutResponseJWS checkoutResponseJWS = new CheckoutResponseJWS();
            CheckoutResponseJWSPayload checkoutResponseJWSPayload = gson.fromJson(gson.toJson(jwsResponsePayload),
                    CheckoutResponseJWSPayload.class);

            checkoutResponseJWS.setJwsPayload(checkoutResponseJWSPayload);
            checkoutResponse.setCheckoutResponseJWS(checkoutResponseJWS);
            checkoutApiResponse.setCheckoutResponseJWSPayload(checkoutResponse);

            result.put(AppConstants.KEY_BODY, checkoutApiResponse);
            result.put(AppConstants.KEY_HEADERS, responseEntity.getHeaders());
            result.put(AppConstants.KEY_STATUS_CODE, responseEntity.getStatusCode().value());

            return ResponseEntity.status(responseEntity.getStatusCode()).body(result);
        } catch (HttpStatusCodeException ex) {
            result.put(AppConstants.KEY_BODY, ex.getResponseBodyAsString());
            result.put(AppConstants.KEY_HEADERS, ex.getResponseHeaders());
            result.put(AppConstants.KEY_STATUS_CODE, ex.getStatusCode().value());

            return ResponseEntity.status(ex.getStatusCode()).body(result);
        } catch (Exception e) {
            result.put(AppConstants.KEY_BODY, e.getMessage());
            result.put(AppConstants.KEY_HEADERS, null);
            result.put(AppConstants.KEY_STATUS_CODE, 500);

            return ResponseEntity.status(500).body(result);
        }
    }
}