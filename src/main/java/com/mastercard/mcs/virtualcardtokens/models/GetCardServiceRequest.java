package com.mastercard.mcs.virtualcardtokens.models;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetCardServiceRequest {
    private String cardId;
    private String serviceId;
    private String srcClientId;
    private String srcCorrelationId;
    private String srcDpaId;
    private boolean tokenRequested;
    private String keyFingerprintId;
    private String flowId;
}
