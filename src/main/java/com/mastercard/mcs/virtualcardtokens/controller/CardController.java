package com.mastercard.mcs.virtualcardtokens.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mastercard.mcs.virtualcardtokens.models.EncryptedCardResponse;
import com.mastercard.mcs.virtualcardtokens.models.GetCardServiceRequest;
import com.mastercard.mcs.virtualcardtokens.service.MasterCardCardsService;
import com.mcs.virtualcardtokens.card.model.Card;
import com.mcs.virtualcardtokens.card.model.EnrollCardRequest;
import com.nimbusds.jose.JOSEException;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class CardController {

    private final MasterCardCardsService cardService;

    public CardController(MasterCardCardsService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/cards/encrypt")
    public ResponseEntity<Object> encryptCard(@RequestBody Card card) {
        try {
            String data = cardService.getEncryptedData(card);
            EncryptedCardResponse response = new EncryptedCardResponse();
            response.setData(data);

            return ResponseEntity.ok(response);
        } catch (JsonProcessingException | ParseException | JOSEException e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/cards")
    public ResponseEntity<Object> enrollCard(@RequestBody EnrollCardRequest request)
            throws IOException, GeneralSecurityException {
        return cardService.enrollCard(request);
    }

    @GetMapping("/cards/{cardId}")
    public ResponseEntity<Object> getCard(@PathVariable String cardId,
            @RequestParam String serviceId,
            @RequestParam String srcClientId,
            @RequestParam(required = false) String srcCorrelationId,
            @RequestParam(required = false) String srcDpaId,
            @RequestParam boolean tokenRequested,
            @RequestParam(required = false) String keyFingerprintId,
            HttpServletRequest request) throws IOException, GeneralSecurityException {
        GetCardServiceRequest serviceRequest = GetCardServiceRequest.builder()
                .cardId(cardId)
                .serviceId(serviceId)
                .srcClientId(srcClientId)
                .srcCorrelationId(srcCorrelationId)
                .srcDpaId(srcDpaId)
                .tokenRequested(tokenRequested)
                .keyFingerprintId(keyFingerprintId)
                .flowId(request.getHeader("X-SRC-CX-FLOW-ID"))
                .build();

        return cardService.getCard(serviceRequest);
    }

    @DeleteMapping("/cards/{cardId}")
    public ResponseEntity<Object> deleteCard(@PathVariable String cardId,
            @RequestParam String serviceId,
            @RequestParam UUID srcClientId,
            @RequestParam(required = false) String srcCorrelationId,
            @RequestParam String reason,
            @RequestParam String requestor,
            @RequestParam(required = false) String srcDpaId) throws IOException, GeneralSecurityException {
        return cardService.deleteCard(
                cardId, serviceId, srcClientId, srcCorrelationId, reason, requestor, srcDpaId);
    }

    @GetMapping("/cards/{cardId}/transactions")
    public ResponseEntity<Object> getCardTransactions(@PathVariable String cardId,
            @RequestParam String serviceId,
            @RequestParam String srcClientId,
            @RequestParam(required = false) String srciTransactionId,
            @RequestParam(required = false) String transactionsFromTimestamp)
            throws IOException, GeneralSecurityException {
        return cardService.getCardTransactions(
                cardId, serviceId, srcClientId, srciTransactionId, transactionsFromTimestamp);
    }
}
