

# DelegatedAuthenticationModel


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**modelType** | [**ModelTypeEnum**](#ModelTypeEnum) | Supported Token Authentication Framework (TAF) implementation. TAF enables Cardholder authentication on tokenized transactions for Mastercard Checkout Solutions (MCS). Mastercard currently offers version AE_TYPE_3 and AE_TYPE_4.  * &#x60;AE_TYPE_3&#x60; indicates that the card is eligible for authentication in the Acquirer domain without Merchant liability protection.  * &#x60;AE_TYPE_4&#x60; indicates that the card is eligible for authentication in the Acquirer domain with Merchant liability protection.  |  |
|**isSupported** | **Boolean** | Flag indicating whether Token Authentication Framework (TAF) is supported for the FPAN. TAF enables Cardholder authentication on tokenized transactions for Mastercard Checkout Solutions (MCS). |  |



## Enum: ModelTypeEnum

| Name | Value |
|---- | -----|
| _3 | &quot;AE_TYPE_3&quot; |
| _4 | &quot;AE_TYPE_4&quot; |



