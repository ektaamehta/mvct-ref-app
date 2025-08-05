package com.mastercard.mcs.virtualcardtokens.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mastercard.mcs.virtualcardtokens.constants.AppConstants;
import com.mastercard.mcs.virtualcardtokens.models.GetCardServiceRequest;
import com.mastercard.mcs.virtualcardtokens.models.Key;
import com.mastercard.mcs.virtualcardtokens.utils.KeyUtil;
import com.mcs.virtualcardtokens.card.api.CardsApi;
import com.mcs.virtualcardtokens.card.api.TransactionsApi;
import com.mcs.virtualcardtokens.card.invoker.ApiClient;
import com.mcs.virtualcardtokens.card.invoker.ApiException;
import com.mcs.virtualcardtokens.card.invoker.ApiResponse;
import com.mcs.virtualcardtokens.card.model.DeleteCardResponse;
import com.mcs.virtualcardtokens.card.model.EnrollCardRequest;
import com.mcs.virtualcardtokens.card.model.EnrollCardResponse;
import com.mcs.virtualcardtokens.card.model.GetCardResponse;
import com.mcs.virtualcardtokens.card.model.GetRecentTransactionsResponse;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWEObject;
import com.nimbusds.jose.crypto.RSAEncrypter;
import com.nimbusds.jose.jwk.RSAKey;

@SpringBootTest
class MasterCardCardsServiceTest {

	@Spy
	@InjectMocks
	private MasterCardCardsService service;

	@Mock
	private KeyUtil keyUtilMock;

	@BeforeEach
	void setUp() {
		service = Mockito.spy(new MasterCardCardsService(keyUtilMock));
	}

	@Test
	@DisplayName("enrollCard should return expected successful response with 200 status code")
	@SuppressWarnings("unchecked")
	void testEnrollCard_shouldReturnSuccessfulResponse() throws Exception {
		EnrollCardRequest request = mock(EnrollCardRequest.class);
		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Mock ApiResponse
		ApiResponse<EnrollCardResponse> apiResponse = mock(ApiResponse.class);
		EnrollCardResponse enrollCardResponse = mock(EnrollCardResponse.class);

		when(apiResponse.getData()).thenReturn(enrollCardResponse);
		when(apiResponse.getHeaders()).thenReturn(new HashMap<>());
		when(apiResponse.getStatusCode()).thenReturn(200);

		// Mock CardsApi constructor and putCardWithHttpInfo
		try (MockedConstruction<CardsApi> mocked = mockConstruction(CardsApi.class,
				(mock, context) -> when(mock.putCardWithHttpInfo(any(EnrollCardRequest.class)))
						.thenReturn(apiResponse))) {
			// Act
			ResponseEntity<Object> response = service.enrollCard(request);

			// Assert
			assertEquals(200, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(enrollCardResponse, body.get(AppConstants.KEY_BODY));
			assertEquals(200, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("enrollCard should throw an ApiException Bad Request response with body and 400 response code")
	@SuppressWarnings("unchecked")
	void testEnrollCard_shouldThrowApiException() throws Exception {
		EnrollCardRequest request = mock(EnrollCardRequest.class);
		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Mock CardsApi constructor and putCardWithHttpInfo
		try (MockedConstruction<CardsApi> mocked = mockConstruction(CardsApi.class,
				(mock, context) -> when(mock.putCardWithHttpInfo(any(EnrollCardRequest.class)))
						.thenThrow(new ApiException("Bad Request", 400, new HashMap<>(), null)))) {
			// Act
			ResponseEntity<Object> response = service.enrollCard(request);

			// Assert
			assertEquals(400, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(400, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("deleteCard should return expected successful response with 200 status code")
	@SuppressWarnings("unchecked")
	void testDeleteCard_shouldReturnSuccessfulResponse() throws Exception {
		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Input params
		String cardId = "123";
		String serviceId = "testService";
		UUID srcClientId = UUID.randomUUID();
		String srcCorrelationId = "corr";
		String reason = "reason";
		String requestor = "requestor";
		String srcDpaId = "dpaid";

		// Mock ApiResponse
		ApiResponse<DeleteCardResponse> apiResponse = mock(ApiResponse.class);
		DeleteCardResponse deleteCardResponse = mock(DeleteCardResponse.class);

		when(apiResponse.getData()).thenReturn(deleteCardResponse);
		when(apiResponse.getHeaders()).thenReturn(new HashMap<>());
		when(apiResponse.getStatusCode()).thenReturn(200);

		// Mock CardsApi constructor and deleteCardWithHttpInfo
		try (MockedConstruction<CardsApi> mocked = mockConstruction(CardsApi.class,
				(mock, context) -> when(mock.deleteCardWithHttpInfo(eq(cardId), eq(srcClientId), eq(serviceId),
						eq(srcDpaId), eq(srcCorrelationId), isNull(), eq(reason), eq(requestor)))
						.thenReturn(apiResponse))) {
			// Act
			ResponseEntity<Object> response = service.deleteCard(cardId, serviceId, srcClientId, srcCorrelationId,
					reason, requestor, srcDpaId);

			// Assert
			assertEquals(200, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(deleteCardResponse, body.get(AppConstants.KEY_BODY));
			assertEquals(200, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("deleteCard should throw an ApiException Bad Request response with body and 400 response code")
	@SuppressWarnings("unchecked")
	void testDeleteCard_shouldThrowApiException() throws Exception {
		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Input params
		String cardId = "123";
		String serviceId = "testService";
		UUID srcClientId = UUID.randomUUID();
		String srcCorrelationId = "corr";
		String reason = "reason";
		String requestor = "requestor";
		String srcDpaId = "dpaid";

		// Mock CardsApi constructor and deleteCardWithHttpInfo
		try (MockedConstruction<CardsApi> mocked = mockConstruction(CardsApi.class,
				(mock, context) -> when(mock.deleteCardWithHttpInfo(eq(cardId), eq(srcClientId), eq(serviceId),
						eq(srcDpaId), eq(srcCorrelationId), isNull(), eq(reason), eq(requestor)))
						.thenThrow(new ApiException("Bad Request", 400, new HashMap<>(), null)))) {
			// Act
			ResponseEntity<Object> response = service.deleteCard(cardId, serviceId, srcClientId, srcCorrelationId,
					reason, requestor, srcDpaId);

			// Assert
			assertEquals(400, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(400, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("getCard should return expected successful response with 200 status code")
	@SuppressWarnings("unchecked")
	void testGetCard_shouldReturnSuccessfulResponse() throws Exception {
		GetCardServiceRequest request = GetCardServiceRequest.builder()
				.cardId("123")
				.serviceId("testService")
				.srcClientId(UUID.randomUUID().toString())
				.srcCorrelationId("corr")
				.srcDpaId("dpaid")
				.tokenRequested(false)
				.keyFingerprintId("keyFingerprint")
				.flowId("flow123")
				.build();

		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Mock ApiResponse
		ApiResponse<GetCardResponse> apiResponse = mock(ApiResponse.class);
		GetCardResponse getCardResponse = mock(GetCardResponse.class);

		when(apiResponse.getData()).thenReturn(getCardResponse);
		when(apiResponse.getHeaders()).thenReturn(new HashMap<>());
		when(apiResponse.getStatusCode()).thenReturn(200);

		// Mock CardsApi constructor and getCardWithHttpInfo
		try (MockedConstruction<CardsApi> mocked = mockConstruction(CardsApi.class,
				(mock, context) -> when(
						mock.getCardWithHttpInfo(eq(request.getCardId()), eq(UUID.fromString(request.getSrcClientId())),
								eq(request.getServiceId()), eq(request.getSrcDpaId()),
								eq(request.getSrcCorrelationId()), isNull(),
								eq(request.isTokenRequested()), eq(request.getKeyFingerprintId()),
								eq(request.getFlowId())))
						.thenReturn(apiResponse))) {
			// Act
			ResponseEntity<Object> response = service.getCard(request);

			// Assert
			assertEquals(200, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(getCardResponse, body.get(AppConstants.KEY_BODY));
			assertEquals(200, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("getCard should throw an ApiException Bad Request response with body and 400 response code")
	@SuppressWarnings("unchecked")
	void testGetCard_shouldThrowApiException() throws Exception {
		GetCardServiceRequest request = GetCardServiceRequest.builder()
				.cardId("123")
				.serviceId("testService")
				.srcClientId(UUID.randomUUID().toString())
				.srcCorrelationId("corr")
				.srcDpaId("dpaid")
				.tokenRequested(false)
				.keyFingerprintId("keyFingerprint")
				.flowId("flow123")
				.build();

		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Mock CardsApi constructor and getCardWithHttpInfo
		try (MockedConstruction<CardsApi> mocked = mockConstruction(CardsApi.class,
				(mock, context) -> when(
						mock.getCardWithHttpInfo(eq(request.getCardId()), eq(UUID.fromString(request.getSrcClientId())),
								eq(request.getServiceId()), eq(request.getSrcDpaId()),
								eq(request.getSrcCorrelationId()), isNull(),
								eq(request.isTokenRequested()), eq(request.getKeyFingerprintId()),
								eq(request.getFlowId())))
						.thenThrow(new ApiException("Bad Request", 400, new HashMap<>(), null)))) {
			// Act
			ResponseEntity<Object> response = service.getCard(request);

			// Assert
			assertEquals(400, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(400, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("getCardTransactions should return expected successful response with 200 status code")
	@SuppressWarnings("unchecked")
	void testGetCardTransactions_shouldReturnSuccessfulResponse() throws Exception {
		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Input params
		String cardId = "123";
		String srcClientId = UUID.randomUUID().toString();
		String serviceId = "testService";
		String srciTransactionId = "testTransactionId";
		String transactionsFromTimestamp = "testTimestamp";

		// Mock ApiResponse
		ApiResponse<GetRecentTransactionsResponse> apiResponse = mock(ApiResponse.class);
		GetRecentTransactionsResponse getRecentTransactionsResponse = mock(GetRecentTransactionsResponse.class);

		when(apiResponse.getData()).thenReturn(getRecentTransactionsResponse);
		when(apiResponse.getHeaders()).thenReturn(new HashMap<>());
		when(apiResponse.getStatusCode()).thenReturn(200);

		// Mock TransactionsApi constructor and getTransactionHistoryWithHttpInfo
		try (MockedConstruction<TransactionsApi> mocked = mockConstruction(TransactionsApi.class,
				(mock, context) -> when(mock.getTransactionHistoryWithHttpInfo(cardId,
						UUID.fromString(srcClientId), serviceId, srciTransactionId, transactionsFromTimestamp))
						.thenReturn(apiResponse))) {
			// Act
			ResponseEntity<Object> response = service.getCardTransactions(cardId, serviceId, srcClientId,
					srciTransactionId, transactionsFromTimestamp);

			// Assert
			assertEquals(200, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(getRecentTransactionsResponse, body.get(AppConstants.KEY_BODY));
			assertEquals(200, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@Test
	@DisplayName("getCardTransactions should throw an ApiException Bad Request response with body and 400 response code")
	@SuppressWarnings("unchecked")
	void testGetCardTransactions_shouldThrowApiException() throws Exception {
		ApiClient mockApiClient = mock(ApiClient.class);

		// Spy the service and override getApiClient and getDefaultApi
		doReturn(mockApiClient).when(service).getCardApiClient();

		// Input params
		String cardId = "123";
		String srcClientId = UUID.randomUUID().toString();
		String serviceId = "testService";
		String srciTransactionId = "testTransactionId";
		String transactionsFromTimestamp = "testTimestamp";

		// Mock TransactionsApi constructor and getTransactionHistoryWithHttpInfo
		try (MockedConstruction<TransactionsApi> mocked = mockConstruction(TransactionsApi.class,
				(mock, context) -> when(mock.getTransactionHistoryWithHttpInfo(cardId,
						UUID.fromString(srcClientId), serviceId, srciTransactionId, transactionsFromTimestamp))
						.thenThrow(new ApiException("Bad Request", 400, new HashMap<>(), null)))) {
			// Act
			ResponseEntity<Object> response = service.getCardTransactions(cardId, serviceId, srcClientId,
					srciTransactionId, transactionsFromTimestamp);

			// Assert
			assertEquals(400, response.getStatusCode().value());
			Map<String, Object> body = (Map<String, Object>) response.getBody();
			assertNotNull(body);
			assertEquals(400, body.get(AppConstants.KEY_STATUS_CODE));
		}
	}

	@ParameterizedTest
	@DisplayName("Test Get Encrypted Data")
	@CsvSource({ "true", "false" })
	void testGetEncryptedData_shouldEncryptPayload(boolean isProduction)
			throws JsonProcessingException, ParseException, JOSEException {
		ReflectionTestUtils.setField(service, "production", isProduction);

		String testData = "{\"test\":\"data\"}";
		Key key = mock(Key.class);

		// Mock keyUtil
		when(keyUtilMock.getKey(anyString(), anyString())).thenReturn(key);

		// Mock RSAKey.parse
		try (
				MockedStatic<RSAKey> rsaKeyStatic = Mockito.mockStatic(RSAKey.class);
				MockedConstruction<RSAEncrypter> rsaEncrypterMocked = Mockito.mockConstruction(RSAEncrypter.class,
						(mock, context) -> {
						});
				MockedConstruction<JWEObject> jweObjectMocked = Mockito.mockConstruction(JWEObject.class,
						(mock, context) -> {
							doNothing().when(mock).encrypt(any(RSAEncrypter.class));
							when(mock.serialize()).thenReturn("mockEncryptedString");
						})) {
			RSAKey rsaKeyMock = mock(RSAKey.class);
			rsaKeyStatic.when(() -> RSAKey.parse(anyString())).thenReturn(rsaKeyMock);

			// Act
			String encrypted = service.getEncryptedData(testData);

			// Assert
			assertEquals("mockEncryptedString", encrypted);
		}
	}
}