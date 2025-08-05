

# DpaTransactionOptions

Object for Integrator to indicate checkout payload related preferences. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**transactionAmount** | [**TransactionAmount**](TransactionAmount.md) |  |  [optional] |
|**merchantCategoryCode** | **String** | Describes the merchant’s type of business, product or service. The same value is expected in the authorization request. |  [optional] |
|**merchantCountryCode** | **String** | Country code of the merchant. |  [optional] |
|**threeDsPreference** | **ThreeDsPreference** |  |  [optional] |
|**threeDsInputData** | [**ThreeDsInputData**](ThreeDsInputData.md) |  |  [optional] |
|**srcTokenRequestData** | [**SrcTokenRequestData**](SrcTokenRequestData.md) |  |  [optional] |
|**paymentOptions** | [**List&lt;PaymentOptions&gt;**](PaymentOptions.md) | Object for the Integrator to define the type of checkout payload they would like to receive. |  [optional] |
|**dpaLocale** | **String** | Merchant&#39;s preferred locale.  |  [optional] |



