

# Browser

In the context of 3-D Secure (3DS), the browser is a conduit to transport messages between the 3DS Server (in the Acquirer domain) and the ACS (in the Issuer domain). This data is required for 3DS authentication and can either be automatically sourced or provided at the time of the request.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**acceptHeader** | **String** | Exact content of the HTTP accept headers as sent to the 3-D Secure (3DS) requestor from the Cardholder&#39;s browser. |  [optional] |
|**javaEnabled** | **Boolean** | Boolean that represents the ability of the Cardholder&#39;s browser to execute java. |  [optional] |
|**javascriptEnabled** | **Boolean** | Boolean that represents the ability of the Cardholder&#39;s browser to execute JavaScript. |  [optional] |
|**ip** | **String** | IP address of the browser as returned by the HTTP headers to the 3-D Secure (3DS) requestor. |  [optional] |
|**language** | **String** | Value representing the browser language as defined in IETF BCP47. |  [optional] |
|**colorDepth** | **String** | Value representing the bit depth of the colour palette for displaying images, in bits per pixel. |  [optional] |
|**screenHeight** | **String** | Total height of the Cardholder’s screen in pixels. |  [optional] |
|**screenWidth** | **String** | Total width of the Cardholder’s screen in pixels. |  [optional] |
|**tz** | **String** | Time-zone offset in minutes between UTC and the Cardholder browser local time. |  [optional] |
|**userAgent** | **String** | Exact content of the HTTP user-agent header. |  [optional] |



