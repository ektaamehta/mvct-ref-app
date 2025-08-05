

# GetCardResponse

The GetCardResponse provides card information associated with a srcDigitalCardId.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**srcCorrelationId** | **String** | A unique identifier that correlates a series of two or more requests to a single session of activity. Mastercard Checkout Solutions (MCS) will return a new srcCorrelationId in each response by default, but Integrators may choose to populate previously used srcCorrelationIds in subsequent requests to correlate their activity under a single ID. This can be done by providing a Mastercard generated srcCorrelationId in the request, or by generating your own ID in the same format. SrcCorrelationId is used for tracking and troubleshooting purposes within Mastercard&#39;s ecosystem. |  [optional] |
|**maskedCard** | [**MaskedCard**](MaskedCard.md) |  |  |
|**encryptedPaymentData** | **String** | This object is subject to manual set-up. Object for encrypted payment data, including paymentToken and relevant token information. Integrators must work with their account managers to be able to receive a token in the get card response. |  [optional] |
|**keyFingerprintId** | **String** | Mastercard will use the encryption key associated with the supplied KID to encrypt the payload. If not supplied, the key which is marked as default will be used. |  [optional] |



