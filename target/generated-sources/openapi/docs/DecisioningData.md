

# DecisioningData

Object for digitization decisioning data, including account score, device score, and digitization decision recommendation.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**recommendation** | **String** | Digitization decision recommended by the Integrator. The Integrator will use the algorithm indicated in the recommendationAlgorithmVersion parameter to determine their recommendation. Must be either:  APPROVED (Recommend a decision of Approved), or DECLINED (Recommend a decision of Declined).  |  [optional] |
|**recommendationAlgorithmVersion** | **String** | Version of the algorithm used by the Integrator to determine its digitization decision recommendation; must be a value of 01. Other values may be supported in the future. |  [optional] |
|**deviceScore** | **String** | Trust / Risk score assigned by the Integrator for the consumer device. Must be a value between 1 and 5, with 1 being low trust and 5 being highly trusted. |  [optional] |
|**accountScore** | **String** | Trust / risk score assigned by the Integrator for the consumer account or relationship. Must be a value between 1 and 5, with 1 being low trust and 5 being highly trusted. |  [optional] |
|**recommendationReasons** | **List&lt;String&gt;** | Code indicating the reason why the Integrator is recommending their digitization decision. See table here - https://developer.mastercard.com/mdes-digital-enablement/documentation/code-and-formats/#recommendation-reason-codes |  [optional] |
|**deviceCurrentLocation** | **String** | Latitude and longitude in the format \&quot;(sign) latitude, (sign) longitude\&quot; with a precision of 2 decimal places. Ex - \&quot;38.63, -90.25\&quot; Latitude is between -90 and 90. Longitude between -180 and 180. Relates to the target device being provisioned. If there is no target device, then this should be the current consumer location, if available.  |  [optional] |
|**deviceIpAddress** | **String** | The IP address of the device through which the device reaches the internet. This may be a temporary or permanent IP address assigned to a home router, or the IP address of a gateway through which the device connects to a network. IPv4 address format of 4 octets separated by \&quot;.\&quot; Ex - 127.0.0.1 Relates to the target device being provisioned. If there is no target device, then this should be the current consumer IP address, if available. |  [optional] |
|**mobileNumberSuffix** | **String** | The last few digits (typically four) of the consumer&#39;s mobile phone number as available on file or on the consumer&#39;s current device, which may or may not be the mobile number of the target device being provisioned. |  [optional] |
|**accountIdHash** | **String** | SHA-256 hash of the Cardholder&#39;s account ID with the Integrator (typically an email address). Max length is 64 alpha-numeric and hex-encoded data (case-insensitive). |  [optional] |



