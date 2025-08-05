

# EnrolmentReferenceData

__Conditional__: Required for alternative ways to enroll cards into Mastercard Checkout Solutions (MCS). This can be used instead of providing the encryptedCard object. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**enrolmentReferenceId** | **String** | This value corresponds to the chosen enrolmentReferenceType and is used by Integrators who may want to pass alternative enrollmentReferenceData to Mastercard Checkout Solutions (MCS) instead of the encryptedCard object. |  |
|**enrolmentReferenceType** | **EnrolmentReferenceType** |  |  |
|**authorization** | **String** | __Conditional__: Integrators supporting Click to Pay (C2P) through Mastercard Checkout Solutions (MCS) can offer their consumers the ability to save their card on file after a guest checkout. To do this, the authorization token from the C2P transaction must be provided in the authorization parameter.  This parameter is required when enrolmentReferenceType is set to SRC_DIGITAL_CARD_ID.  |  [optional] |



