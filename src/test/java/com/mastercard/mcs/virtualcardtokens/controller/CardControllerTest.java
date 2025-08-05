package com.mastercard.mcs.virtualcardtokens.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.mastercard.mcs.virtualcardtokens.models.GetCardServiceRequest;
import com.mastercard.mcs.virtualcardtokens.service.MasterCardCardsService;
import com.mcs.virtualcardtokens.card.model.Card;
import com.mcs.virtualcardtokens.card.model.EnrollCardRequest;

import jakarta.servlet.http.HttpServletRequest;

class CardControllerTest {

    @Mock
    private MasterCardCardsService cardService;

    @InjectMocks
    private CardController cardController;

    @Mock
    private HttpServletRequest httpServletRequest;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void should_encryptCard() throws Exception {
        Card request = new Card();
        doReturn("encryptedCardData").when(cardService).getEncryptedData(any(Card.class));

        ResponseEntity<Object> response = cardController.encryptCard(request);
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(200, response.getStatusCode().value());

        verify(cardService, times(1)).getEncryptedData(any(Card.class));
    }

    @Test
    void should_throwParseExceptionEncryptCard() throws Exception {
        Card request = new Card();
        doThrow(ParseException.class).when(cardService).getEncryptedData(any(Card.class));

        ResponseEntity<Object> response = cardController.encryptCard(request);
        assertNotNull(response);
        assertEquals(500, response.getStatusCode().value());

        verify(cardService, times(1)).getEncryptedData(any(Card.class));
    }

    @Test
    void should_enrollCard() throws Exception {
        EnrollCardRequest request = new EnrollCardRequest();
        doReturn(mockApiResponse()).when(cardService).enrollCard(request);

        ResponseEntity<Object> response = cardController.enrollCard(request);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(cardService, times(1)).enrollCard(request);
    }

    @SuppressWarnings("unchecked")
    private ResponseEntity<Object> mockApiResponse() {
        ResponseEntity<Object> response = mock(ResponseEntity.class);
        when(response.getStatusCode()).thenReturn(HttpStatusCode.valueOf(200));
        when(response.getBody()).thenReturn(null);

        return response;
    }

    @Test
    void should_getCard() throws Exception {
        // Input params
        String cardId = "123";
        String serviceId = "testService";
        String srcClientId = UUID.randomUUID().toString();
        String srcCorrelationId = "corr";
        String srcDpaId = "dpaid";
        boolean tokenRequested = false;
        String keyFingerprintId = "key123";
        String flowId = "34f4a04b.7602af12-a18b-4023-a476-8231ddcaefe7.1621276711";

        when(httpServletRequest.getHeader("X-SRC-CX-FLOW-ID")).thenReturn(flowId);

        doReturn(mockApiResponse()).when(cardService).getCard(any(GetCardServiceRequest.class));

        ResponseEntity<Object> response = cardController.getCard(cardId, serviceId, srcClientId, srcCorrelationId,
                srcDpaId, tokenRequested, keyFingerprintId, httpServletRequest);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(cardService, times(1)).getCard(any(GetCardServiceRequest.class));
    }

    @Test
    void should_deleteCard() throws Exception {
        // Input params
        String cardId = "123";
        String serviceId = "testService";
        UUID srcClientId = UUID.randomUUID();
        String srcCorrelationId = "corr";
        String reason = "reason";
        String requestor = "requestor";
        String srcDpaId = "srcDpaId";

        doReturn(mockApiResponse()).when(cardService).deleteCard(anyString(), anyString(), any(UUID.class),
                anyString(), anyString(), anyString(), anyString());

        ResponseEntity<Object> response = cardController.deleteCard(cardId, serviceId, srcClientId, srcCorrelationId,
                reason, requestor, srcDpaId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(cardService, times(1)).deleteCard(anyString(), anyString(), any(UUID.class),
                anyString(), anyString(), anyString(), anyString());
    }

    @Test
    void should_getCardTransactions() throws Exception {
        // Input params
        String cardId = "123";
        String serviceId = "testService";
        String srcClientId = UUID.randomUUID().toString();
        String srciTransactionId = "srci123";
        String transactionsFromTimestamp = "transactionTimestamp";

        doReturn(mockApiResponse()).when(cardService).getCardTransactions(anyString(), anyString(), anyString(),
                anyString(), anyString());

        ResponseEntity<Object> response = cardController.getCardTransactions(cardId, serviceId, srcClientId,
                srciTransactionId, transactionsFromTimestamp);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(cardService, times(1)).getCardTransactions(anyString(), anyString(), anyString(),
                anyString(), anyString());
    }
}