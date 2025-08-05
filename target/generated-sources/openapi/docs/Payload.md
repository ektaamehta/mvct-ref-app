

# Payload

Object for the signed and encrypted payload in JWE format. Refer to Payload object for additional data. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**card** | [**Card**](Card.md) |  |  [optional] |
|**token** | [**PaymentToken**](PaymentToken.md) |  |  [optional] |
|**shippingAddress** | [**Address**](Address.md) |  |  [optional] |
|**consumerEmailAddress** | **String** | Consumer-provided email address. |  [optional] |
|**consumerFirstName** | **String** | Consumer-provided first name. |  [optional] |
|**consumerLastName** | **String** | Consumer-provided last name. |  [optional] |
|**consumerFullName** | **String** | Consumer-provided full name. |  [optional] |
|**consumerMobileNumber** | [**PhoneNumber**](PhoneNumber.md) |  |  [optional] |
|**consumerNationalIdentifier** | **String** | Geographic-specific, nationally-provided identifier for the Consumer. |  [optional] |
|**srcTokenResultsData** | [**SrcTokenResultsData**](SrcTokenResultsData.md) |  |  [optional] |
|**dynamicData** | [**DynamicData**](DynamicData.md) |  |  [optional] |
|**billingAddress** | [**Address**](Address.md) |  |  [optional] |
|**threeDsOutputData** | [**ThreeDsOutputData**](ThreeDsOutputData.md) |  |  [optional] |



