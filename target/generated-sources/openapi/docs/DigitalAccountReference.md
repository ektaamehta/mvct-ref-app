

# DigitalAccountReference

Object for digital account reference value and type. Applicable for Guest Checkout Tokenization 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**digitalAccountReferenceValue** | **String** | This value corresponds to the chosen digitalAccountReferenceType and is used by Integrators who would like to enroll the underlying card.  * If digitalAccountReferenceType &#x3D; ENCRYPTED_CARD, this field should carry the JWE[card].  * If digitalAccountReferenceType &#x3D; SRC_DIGITAL_CARD_ID, this field should carry the srcDigitalCardId value.  |  |
|**digitalAccountReferenceType** | **DigitalAccountReferenceType** |  |  |



