

# DpaData

DPA data is DPA related information passed during checkout.  __Conditional__: At least one of the 3 fields within DpaData is required if you are enrolled in Delegated Authentication, or are using the Mastercard Merchant presented QR: SRC program. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**dpaPresentationName** | **String** | \&quot;doing business as\&quot; name  |  [optional] |
|**dpaName** | **String** | Legal name of registered DPA. |  [optional] |
|**dpaUri** | **String** | Unique DPA Identifier, such as UUID, URL, APK package name etc. |  [optional] |



