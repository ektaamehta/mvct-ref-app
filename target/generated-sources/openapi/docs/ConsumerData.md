

# ConsumerData

Consumer supplied data, either manually entered (or supplied by other means, e.g. voice, camera etc.) or previously stored.  __Conditional__: At least one of consumerData or sellerData is required. Please note that consumerData values override the sellerData. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**billNumber** | **String** | The invoice number or bill number. This number could be provided by the merchant or could be an indication for the mobile application to prompt the consumer to input a Bill Number. For example, the Bill Number may be present when the QR Code is used for bill payment. |  [optional] |
|**mobileNumber** | **String** | The mobile number could be provided by the merchant or could be an indication for the mobile application to prompt the consumer to input a Mobile Number. For example, the Mobile Number to be used for multiple use cases, such as mobile top-up and bill payment. |  [optional] |
|**storeLabel** | **String** | A distinctive value associated to a store. This value could be provided by the merchant or could be an indication for the mobile application to prompt the consumer to input a Store Label. For example, the Store Label may be displayed to the consumer on the mobile application identifying a specific store. |  [optional] |
|**loyaltyNumber** | **String** | Typically, a loyalty card number. This number could be provided by the merchant, if known, or could be an indication for the mobile application to prompt the consumer to input their Loyalty Number. |  [optional] |
|**referenceLabel** | **String** | Any value as defined by the merchant or acquirer in order to identify the transaction. This value could be provided by the merchant or could be an indication for the mobile app to prompt the consumer to input a transaction Reference Label. For example, the Reference Label may be used by the consumer mobile application for transaction logging or receipt display. |  [optional] |
|**customerLabel** | **String** | Any value identifying a specific consumer. This value could be provided by the merchant (if known), or could be an indication for the mobile application to prompt the consumer to input their Customer Label. For example, the Customer Label may be a subscriber ID for subscription services, a student enrolment number, etc. |  [optional] |
|**terminalLabel** | **String** | Populated with a Consumer-entered terminal label if the Terminal Label (ID \&quot;07\&quot;), with a value of \&quot;***\&quot;, is present within the Additional Data Field Template (ID \&quot;62\&quot;) of the QR Code Payload |  [optional] |
|**purposeOftransaction** | **String** | Any value identifying a specific consumer. This value could be provided by the merchant (if known), or could be an indication for the mobile application to prompt the consumer to input their Customer Label. For example, the Customer Label may be a subscriber ID for subscription services, a student enrolment number, etc. |  [optional] |
|**emailId** | **String** | Email address of the consumer. |  [optional] |
|**phoneNumber** | **String** | Mobile number of the consumer. |  [optional] |
|**address** | **String** | Address of the consumer. |  [optional] |



