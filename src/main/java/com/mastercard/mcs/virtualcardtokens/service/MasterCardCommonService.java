package com.mastercard.mcs.virtualcardtokens.service;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ResourceUtils;

import com.mastercard.developer.encryption.EncryptionException;
import com.mastercard.developer.encryption.JweConfig;
import com.mastercard.developer.encryption.JweConfigBuilder;
import com.mastercard.developer.interceptors.OkHttpOAuth1Interceptor;
import com.mastercard.developer.utils.AuthenticationUtils;
import com.mastercard.developer.utils.EncryptionUtils;

import okhttp3.OkHttpClient;

@Service
public class MasterCardCommonService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MasterCardCommonService.class);
    public static final String ENCRYPTED_PAYLOAD = "encryptedPayload";

    @Value("${production:false}")
    boolean production;

    @Value("${signing.consumerKey}")
    public String consumerKey;

    @Value("${signing.pkcs12KeyFile}")
    private String pkcs12KeyFile;

    @Value("${signing.keyAlias}")
    private String signingKeyAlias;

    @Value("${signing.keyPassword}")
    private String signingKeyPassword;

    @Value("${mastercard.encryption.pkcs12KeyFile:defaultValue}")
	private String mastercardEncryptionPkcs12KeyFile;

	@Value("${mastercard.encryption.keyAlias:defaultValue}")
	private String mastercardEncryptionKeyAlias;

	@Value("${mastercard.encryption.keyPassword:defaultValue}")
	private String mastercardEncryptionKeyPassword;

    @Value("${mastercard.api.base-url.sandbox}")
    public String sandboxBaseUrl;

    @Value("${mastercard.api.base-url.production}")
    public String productionBaseUrl;

    private JweConfig decryptionConfig;

    public PrivateKey getSigningKey() throws IOException, GeneralSecurityException {
        File keyFile = ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX + pkcs12KeyFile);
        LOGGER.debug("Loading signing key from: {}", keyFile.getAbsolutePath());

        return AuthenticationUtils.loadSigningKey(
                keyFile.getPath(),
                signingKeyAlias,
                signingKeyPassword);
    }

    public com.mcs.virtualcardtokens.card.invoker.ApiClient getCardApiClient()
            throws IOException, GeneralSecurityException {
        String basePath = production ? productionBaseUrl : sandboxBaseUrl;

        com.mcs.virtualcardtokens.card.invoker.ApiClient apiClient = new com.mcs.virtualcardtokens.card.invoker.ApiClient();
        apiClient.setBasePath(basePath + "/api/digital/payments");
        apiClient.setDebugging(true);

        OkHttpClient client = apiClient.getHttpClient()
                .newBuilder()
                .addInterceptor(new OkHttpOAuth1Interceptor(consumerKey, getSigningKey()))
                .build();

        apiClient.setHttpClient(client);

        return apiClient;
    }

    protected com.mcs.virtualcardtokens.checkout.invoker.ApiClient getCheckoutApiClient()
            throws IOException, GeneralSecurityException {

        String basePath = production ? productionBaseUrl : sandboxBaseUrl;

        com.mcs.virtualcardtokens.checkout.invoker.ApiClient apiClient = new com.mcs.virtualcardtokens.checkout.invoker.ApiClient();
        apiClient.setBasePath(basePath + "/api/digital/payments/transaction/credentials");
        apiClient.setDebugging(true);

        OkHttpClient client = apiClient.getHttpClient()
                .newBuilder()
                .addInterceptor(new OkHttpOAuth1Interceptor(consumerKey, getSigningKey()))
                .build();
        apiClient.setHttpClient(client);

        return apiClient;
    }

    public JweConfig getDecryptionConfig() throws GeneralSecurityException, IOException, EncryptionException {
		if (ObjectUtils.isEmpty(decryptionConfig)) {
			File decryptionCert = ResourceUtils.getFile("classpath:"+mastercardEncryptionPkcs12KeyFile); // .p12 file
			PrivateKey decryptionKey = EncryptionUtils.loadDecryptionKey(decryptionCert.getPath(),
					mastercardEncryptionKeyAlias, mastercardEncryptionKeyPassword);
			decryptionConfig = JweConfigBuilder.aJweEncryptionConfig()
					.withEncryptionPath("undefined", "undefined")
					.withDecryptionKey(decryptionKey)
					.withDecryptionPath("$.encryptedPayload", "$")
					.withEncryptedValueFieldName(ENCRYPTED_PAYLOAD)
					.build();
		}

		return decryptionConfig;
	}
}