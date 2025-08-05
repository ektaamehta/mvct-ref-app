

# MaskedCard

Object for information related to an enrolled card into Mastercard Checkout Solutions - details include card art, masked PAN information, and token data.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**srcDigitalCardId** | **String** | A unique identifier that represents the token associated with a card enrolled into Mastercard Checkout Solutions. Use this srcDigitalCardId in subsequent Checkout API requests to retrieve a DRSP payload containing the associated token and cryptogram for payment authoritzation. Alternatively, use the srcDigitalCardId in a Get Card request to retrieve the maskedCard details. |  |
|**srcPaymentCardId** | **String** | A reference representing the PAN that enables the Click to Pay System to communicate with the SRC Participating Issuer without transmitting the actual PAN. It is associated with the SRC Profile to which the payment card belongs and is unique within an Click to Pay System.  |  [optional] |
|**panBin** | **String** | The first six digits of a PAN, typically the issuer BIN, in an unmasked format. |  |
|**panLastFour** | **String** | Attribute of the Payment Card that represents the Last four digits of the PAN included in an unmasked form. |  |
|**tokenBinRange** | **String** | Specific BIN range or subset of the BIN Range that has been designated only for the purpose of issuing Payment Tokens in an unmasked form. |  [optional] |
|**tokenLastFour** | **String** | Last four digits of the payment token included in an unmasked form. |  [optional] |
|**digitalCardData** | [**DigitalCardData**](DigitalCardData.md) |  |  |
|**panExpirationMonth** | **String** | Expiration month of the Payment Card expressed as a two-digit calendar month used for presentation purposes. |  [optional] |
|**panExpirationYear** | **String** | Expiration year of the Payment Card expressed as four-digit calendar year, used for presentation purposes. |  [optional] |
|**paymentCardDescriptor** | **String** | Indicates the card payment network. This will be set to &#39;mastercard&#39; or &#39;maestro&#39;. |  [optional] |
|**paymentCardType** | [**PaymentCardTypeEnum**](#PaymentCardTypeEnum) | Conveys the card type. Note that COMBO and FLEX are for applicable regions only. |  [optional] |
|**digitalCardFeatures** | [**List&lt;DigitalCardFeature&gt;**](DigitalCardFeature.md) | Card benefits associated with a Digital Card to be presented to the Consumer at the time of checkout. |  [optional] |
|**countryCode** | **String** | Country code associated with the Card Issuer&#39;s BIN license. ISO 3166-1 alpha 2 country code. |  [optional] |
|**maskedBillingAddress** | [**MaskedAddress**](MaskedAddress.md) |  |  [optional] |
|**dcf** | [**DCF**](DCF.md) |  |  [optional] |
|**serviceId** | **String** | A unique identifier assigned by Mastercard for which tokens are created uniquely for the entity onboarded. |  [optional] |
|**paymentAccountReference** | **String** | A non-financial reference assigned to each unique PAN that&#39;s used to link the payment account of that PAN to affiliated payment tokens. |  [optional] |
|**tokenUniqueReference** | **String** | The value of a unique identifier for a token provided by Mastercard Digital Enablement Services (MDES) |  [optional] |
|**dateOfCardCreated** | **String** | Date (in UTC) when card was enrolled |  |
|**dateOfCardLastUsed** | **String** | Date (in UTC) when card was last used for a transaction |  [optional] |
|**delegatedAuthenticationModels** | [**List&lt;DelegatedAuthenticationModels&gt;**](DelegatedAuthenticationModels.md) | Delegated authentication models. For Secure Card on File this will not be returned for Prepare Profile. It will only be available for Enroll Card and Get Card responses. |  [optional] |



## Enum: PaymentCardTypeEnum

| Name | Value |
|---- | -----|
| CREDIT | &quot;CREDIT&quot; |
| DEBIT | &quot;DEBIT&quot; |
| PREPAID | &quot;PREPAID&quot; |
| COMBO | &quot;COMBO&quot; |
| FLEX | &quot;FLEX&quot; |



