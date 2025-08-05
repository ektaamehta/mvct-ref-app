package com.mastercard.mcs.virtualcardtokens.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mastercard.mcs.virtualcardtokens.constants.AppConstants;
import com.mastercard.mcs.virtualcardtokens.models.GetCardServiceRequest;
import com.mastercard.mcs.virtualcardtokens.models.Key;
import com.mastercard.mcs.virtualcardtokens.utils.KeyUtil;
import com.mcs.virtualcardtokens.card.api.CardsApi;
import com.mcs.virtualcardtokens.card.api.TransactionsApi;
import com.mcs.virtualcardtokens.card.invoker.ApiException;
import com.mcs.virtualcardtokens.card.invoker.ApiResponse;
import com.mcs.virtualcardtokens.card.model.DeleteCardResponse;
import com.mcs.virtualcardtokens.card.model.EnrollCardRequest;
import com.mcs.virtualcardtokens.card.model.EnrollCardResponse;
import com.mcs.virtualcardtokens.card.model.GetCardResponse;
import com.mcs.virtualcardtokens.card.model.GetRecentTransactionsResponse;
import com.nimbusds.jose.EncryptionMethod;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWEAlgorithm;
import com.nimbusds.jose.JWEHeader;
import com.nimbusds.jose.JWEObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.RSAEncrypter;
import com.nimbusds.jose.jwk.RSAKey;

@Service
public class MasterCardCardsService extends MasterCardCommonService {

    private final KeyUtil keyUtil;

    public MasterCardCardsService(KeyUtil keyUtil) {
        this.keyUtil = keyUtil;
    }

    public ResponseEntity<Object> enrollCard(EnrollCardRequest enrollCardRequest)
            throws IOException, GeneralSecurityException {
        Map<String, Object> enrollCardResponse = new HashMap<>();
        try {
            CardsApi api = new CardsApi(getCardApiClient());
            ApiResponse<EnrollCardResponse> resp = api.putCardWithHttpInfo(enrollCardRequest);
            enrollCardResponse.put(AppConstants.KEY_BODY, resp.getData());
            enrollCardResponse.put(AppConstants.KEY_HEADERS, resp.getHeaders());
            enrollCardResponse.put(AppConstants.KEY_STATUS_CODE, resp.getStatusCode());

            return ResponseEntity.status(resp.getStatusCode()).body(enrollCardResponse);
        } catch (ApiException e) {
            enrollCardResponse.put(AppConstants.KEY_BODY, e.getResponseBody());
            enrollCardResponse.put(AppConstants.KEY_HEADERS, e.getResponseHeaders());
            enrollCardResponse.put(AppConstants.KEY_STATUS_CODE, e.getCode());

            return ResponseEntity.status(e.getCode()).body(enrollCardResponse);
        }
    }

    public ResponseEntity<Object> deleteCard(String cardId, String serviceId, UUID srcClientId,
            String srcCorrelationId, String reason, String requestor, String srcDpaId)
            throws IOException, GeneralSecurityException {
        Map<String, Object> deleteCardResponse = new HashMap<>();
        try {
            CardsApi api = new CardsApi(getCardApiClient());
            ApiResponse<DeleteCardResponse> resp = api.deleteCardWithHttpInfo(
                    cardId, srcClientId, serviceId, srcDpaId, srcCorrelationId, null, reason, requestor);
            deleteCardResponse.put(AppConstants.KEY_BODY, resp.getData());
            deleteCardResponse.put(AppConstants.KEY_HEADERS, resp.getHeaders());
            deleteCardResponse.put(AppConstants.KEY_STATUS_CODE, resp.getStatusCode());

            return ResponseEntity.status(resp.getStatusCode()).body(deleteCardResponse);
        } catch (ApiException e) {
            deleteCardResponse.put(AppConstants.KEY_BODY, e.getResponseBody());
            deleteCardResponse.put(AppConstants.KEY_HEADERS, e.getResponseHeaders());
            deleteCardResponse.put(AppConstants.KEY_STATUS_CODE, e.getCode());

            return ResponseEntity.status(e.getCode()).body(deleteCardResponse);
        }
    }

    public ResponseEntity<Object> getCardTransactions(String cardId, String serviceId, String srcClientId,
            String srciTransactionId, String transactionsFromTimestamp) throws IOException, GeneralSecurityException {
        Map<String, Object> getCardTransactionsResponse = new HashMap<>();
        try {
            TransactionsApi transactionsApi = new TransactionsApi(getCardApiClient());
            ApiResponse<GetRecentTransactionsResponse> resp = transactionsApi.getTransactionHistoryWithHttpInfo(
                    cardId, UUID.fromString(srcClientId), serviceId, srciTransactionId, transactionsFromTimestamp);
            getCardTransactionsResponse.put(AppConstants.KEY_BODY, resp.getData());
            getCardTransactionsResponse.put(AppConstants.KEY_HEADERS, resp.getHeaders());
            getCardTransactionsResponse.put(AppConstants.KEY_STATUS_CODE, resp.getStatusCode());

            return ResponseEntity.status(resp.getStatusCode()).body(getCardTransactionsResponse);
        } catch (ApiException e) {
            getCardTransactionsResponse.put(AppConstants.KEY_BODY, e.getResponseBody());
            getCardTransactionsResponse.put(AppConstants.KEY_HEADERS, e.getResponseHeaders());
            getCardTransactionsResponse.put(AppConstants.KEY_STATUS_CODE, e.getCode());

            return ResponseEntity.status(e.getCode()).body(getCardTransactionsResponse);
        }
    }

    public ResponseEntity<Object> getCard(GetCardServiceRequest request) throws IOException, GeneralSecurityException {
        Map<String, Object> getCardResponse = new HashMap<>();
        try {
            CardsApi api = new CardsApi(getCardApiClient());
            ApiResponse<GetCardResponse> resp = api.getCardWithHttpInfo(
                    request.getCardId(),
                    UUID.fromString(request.getSrcClientId()),
                    request.getServiceId(),
                    request.getSrcDpaId(),
                    request.getSrcCorrelationId(),
                    null, // srciTransactionId not needed now
                    request.isTokenRequested(),
                    request.getKeyFingerprintId(),
                    request.getFlowId());
            getCardResponse.put(AppConstants.KEY_BODY, resp.getData());
            getCardResponse.put(AppConstants.KEY_HEADERS, resp.getHeaders());
            getCardResponse.put(AppConstants.KEY_STATUS_CODE, resp.getStatusCode());

            return ResponseEntity.status(resp.getStatusCode()).body(getCardResponse);
        } catch (ApiException e) {
            getCardResponse.put(AppConstants.KEY_BODY, e.getResponseBody());
            getCardResponse.put(AppConstants.KEY_HEADERS, e.getResponseHeaders());
            getCardResponse.put(AppConstants.KEY_STATUS_CODE, e.getCode());

            return ResponseEntity.status(e.getCode()).body(getCardResponse);
        }
    }

    public String getEncryptedData(Object data)
            throws JsonProcessingException, ParseException, JOSEException {
        ObjectMapper objectMapper = new ObjectMapper();

        String cardPayLoad = objectMapper.writeValueAsString(data);

        String mastercardKeysUrl;
        String masetercardEncryptionKid;

        if (production) {
            mastercardKeysUrl = "https://src.mastercard.com/keys";
            masetercardEncryptionKid = "20230227135603-prod-fpan-encryption-src-mastercard-int";
        } else {
            mastercardKeysUrl = "https://sandbox.src.mastercard.com/keys";
            masetercardEncryptionKid = "20230207223521-sandbox-fpan-encryption-src-mastercard-int";
        }

        Key key = keyUtil.getKey(mastercardKeysUrl, masetercardEncryptionKid);

        String keyString = objectMapper.writeValueAsString(key);
        RSAKey rsaEncryptionKey = RSAKey.parse(keyString);
        RSAEncrypter rsaEncrypter = new RSAEncrypter(rsaEncryptionKey);
        JWEObject jweObject = new JWEObject(
                new JWEHeader.Builder(JWEAlgorithm.RSA_OAEP_256, EncryptionMethod.A128GCM)
                        .keyID(masetercardEncryptionKid).build(),
                new Payload(cardPayLoad));
        jweObject.encrypt(rsaEncrypter);

        return jweObject.serialize();
    }
}
