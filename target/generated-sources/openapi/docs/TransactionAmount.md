

# TransactionAmount

__Conditional__: An object for transaction amount details that must be provided for Mastercard Merchant Presented QR:SRC program, or if you need to receive a v3 cryptogram. A v3 cryptogram is an enhanced cryptogram used for the Token Authentication Framework (TAF), which strengthens the security of a transaction by linking it to a specific amount and merchant. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**transactionAmount** | **BigDecimal** | Numeric value of transaction amount and must be positive. Fractions, if present in the transaction amount value, will be affixed with zero/s to match the minor unit of transaction currency in question. Maximum value allowed will be 13 digits (including decimal point and affixed fractions). |  |
|**transactionCurrencyCode** | **String** | ISO 4217 three-digit currency code for the transaction. |  |



