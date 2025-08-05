

# EnrollCardRequest

The EnrollCardRequest is used to create unique tokens for Mastercard Checkout Solutions (MCS) Integrators.    The EnrollCardRequest must contain the following values:    * `serviceId`   * `srcClientId`   * `cardSource`   * `consumerEnrollCardRequest`   * `encryptedCard JWE[Card] or enrolmentReferenceData`   * `srcDpaId is conditional`  Please note that the current example shows all objects.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**srcClientId** | **UUID** | A unique identifier assigned by Mastercard during onboarding which signifies the responsible party Integrating to Mastercard Checkout Solutions (MCS). |  |
|**srcDpaId** | **String** | The registered identifier for the Digital Payment Application (DPA) accessing the service.  __Conditional__: Required if you are a Merchant directly integrating with Mastercard Checkout Solutions (MCS) APIs, a Payment Service Provider (PSP) integrating On-Behalf-Of (OBO) a Merchant, a Payment Facilitator, or if you are enrolling in the Secure Card on File (SCOF) QR program.  |  [optional] |
|**srcCorrelationId** | **String** | A unique identifier that correlates a series of two or more requests to a single session of activity. Mastercard Checkout Solutions (MCS) will return a new srcCorrelationId in each response by default, but Integrators may choose to populate previously used srcCorrelationIds in subsequent requests to correlate their activity under a single ID. This can be done by providing a Mastercard generated srcCorrelationId in the request, or by generating your own ID in the same format. SrcCorrelationId is used for tracking and troubleshooting purposes within Mastercard&#39;s ecosystem. |  [optional] |
|**serviceId** | **String** | A unique identifier assigned by Mastercard for which tokens are created uniquely for the entity onboarded. |  |
|**keyFingerprintId** | **String** | Mastercard will use the encryption key associated with the supplied KID to encrypt the payload. If not supplied, the key which is marked as default will be used. |  [optional] |
|**encryptedCard** | **String** | __Conditional__: encryptedCard must be passed for FPAN based enrollment. This object is of type JWE[Card] and must be encrypted using the steps in this tutorial- https://developer.mastercard.com/mastercard-checkout-solutions/tutorial/perform-encryption/.   Please see enrolmentReferenceData for alternative forms of enrollment.  |  [optional] |
|**consumer** | [**Consumer**](Consumer.md) |  |  |
|**srcTokenRequestData** | [**SrcTokenRequestData**](SrcTokenRequestData.md) |  |  [optional] |
|**cardSource** | **Origin** |  |  |
|**enrolmentReferenceData** | [**EnrolmentReferenceData**](EnrolmentReferenceData.md) |  |  [optional] |
|**assuranceData** | [**AssuranceData**](AssuranceData.md) |  |  [optional] |



