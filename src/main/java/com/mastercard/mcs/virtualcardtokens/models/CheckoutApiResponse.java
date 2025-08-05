package com.mastercard.mcs.virtualcardtokens.models;

import com.mcs.virtualcardtokens.checkout.model.CheckoutResponse;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CheckoutApiResponse {
    private String checkoutResponseJWS;
    private CheckoutResponse checkoutResponseJWSPayload;
}
