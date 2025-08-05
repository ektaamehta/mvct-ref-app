

# Card


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**primaryAccountNumber** | **String** | A variable length, ISO/IEC 7812-compliant account number that is generated within account ranges associated with a BIN by a Card Issuer. |  |
|**panExpirationMonth** | **String** | Expiration month of the Card, expressed as a two-digit calendar month. |  [optional] |
|**panExpirationYear** | **String** | Expiration year of the Card, expressed as a four-digit calendar year. |  [optional] |
|**cardSecurityCode** | **String** | Card security code/CVV2 |  [optional] |
|**cardholderFullName** | **String** | Cardholder Full Name. |  [optional] |
|**cardholderFirstName** | **String** | Cardholder First Name. |  [optional] |
|**cardholderLastName** | **String** | Cardholder Last Name. |  [optional] |
|**billingAddress** | [**Address**](Address.md) |  |  [optional] |
|**paymentAccountReference** | **String** | A non-financial reference assigned to each unique PAN that&#39;s used to link the payment account of that PAN to affiliated payment tokens.  |  [optional] |



