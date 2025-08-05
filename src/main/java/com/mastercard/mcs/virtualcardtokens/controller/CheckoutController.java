package com.mastercard.mcs.virtualcardtokens.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.mcs.virtualcardtokens.service.MasterCardVCTCheckoutService;
import com.mcs.virtualcardtokens.checkout.model.CheckoutRequest;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class CheckoutController {

    private final MasterCardVCTCheckoutService masterCardVCTCheckoutService;

    public CheckoutController(MasterCardVCTCheckoutService masterCardVCTCheckoutService) {
        this.masterCardVCTCheckoutService = masterCardVCTCheckoutService;
    }

    @PostMapping("/transaction/credentials")
    public ResponseEntity<Object> processTransactionCredentials(
            @RequestBody CheckoutRequest checkoutRequest, HttpServletRequest request) {
        final String flowId = request.getHeader("X-SRC-CX-FLOW-ID");
        final String responseHost = request.getHeader("X-SRC-RESPONSE-HOST");

        return masterCardVCTCheckoutService.customFetchTransactionCredentials(checkoutRequest, flowId, responseHost);
    }
}
