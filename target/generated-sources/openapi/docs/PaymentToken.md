

# PaymentToken

Object for token meta data.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**paymentToken** | **String** | The unique token for the enrolled PAN which can be used in authorization as per ISO/IEC 7812 format. |  |
|**tokenExpirationMonth** | **String** | Expiration month of the token expressed as a two-digit calendar month. Supplied when specified for the Payment Token.  |  [optional] |
|**tokenExpirationYear** | **String** | Expiration year of the token expressed as four-digit calendar year. Supplied when specified for the Payment Token.  |  [optional] |
|**paymentAccountReference** | **String** | A non-financial reference assigned to each unique PAN and used to link a Payment Account represented by that PAN to affiliated Payment Tokens. |  [optional] |
|**panSequenceNumber** | **String** | Application PAN sequence number for the token that can be provided in DE 23 of authorization. |  [optional] |



