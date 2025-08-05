

# EnrollCardResponse

The EnrollCardResponse for a successful enrollment will contain a srcDigitalCardId. A srcDigitalCardId is a unique identifier that represents the token associated with a card enrolled in Mastercard Checkout Solutions (MCS) and must be used in subsequent API calls.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**srcCorrelationId** | **String** | A unique identifier that correlates a series of two or more requests to a single session of activity. Mastercard Checkout Solutions (MCS) will return a new srcCorrelationId in each response by default, but Integrators may choose to populate previously used srcCorrelationIds in subsequent requests to correlate their activity under a single ID. This can be done by providing a Mastercard generated srcCorrelationId in the request, or by generating your own ID in the same format. SrcCorrelationId is used for tracking and troubleshooting purposes within Mastercard&#39;s ecosystem. |  |
|**maskedCard** | [**MaskedCard**](MaskedCard.md) |  |  |
|**maskedConsumer** | [**MaskedConsumer**](MaskedConsumer.md) |  |  [optional] |
|**encryptedPushAccountData** | **String** | Encrypted card data in the form of a JWE[$ref: &#39;#/schemas/PushAccountReceiptCardDetails&#39;] string that contains the card details for push account receipt with address. It is returned for push account receipt enrollment. |  [optional] |
|**keyFingerprintId** | **String** | Mastercard will use the encryption key associated with the supplied KID to encrypt the payload. If not supplied, the key which is marked as default will be used. |  [optional] |
|**encryptedPaymentData** | **String** | Contains token information including payment token and token expiry. This is in a JWE[$ref: &#39;#/schemas/PaymentData&#39;] format. |  [optional] |



