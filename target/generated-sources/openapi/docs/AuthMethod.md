

# AuthMethod

One of the supported methods available for authenticating the enrolled card. Each supported method will have individual objects with related information under it.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**authenticationMethodType** | [**AuthenticationMethodTypeEnum**](#AuthenticationMethodTypeEnum) | Type of authenticationCredential being used by the Issuer to authenticate the consumer. The authenticationMethodType will dictate the content of the authenticationCredential parameter. |  [optional] |
|**authenticationSubject** | **String** | The entity which is the subject of this authentication request. |  [optional] |
|**authenticationCredentialReference** | **String** | The credential of the entity which is the subject of this authentication request. |  [optional] |
|**uriData** | [**UriData**](UriData.md) |  |  [optional] |



## Enum: AuthenticationMethodTypeEnum

| Name | Value |
|---- | -----|
| _3DS | &quot;3DS&quot; |
| MANAGED_AUTHENTICATION | &quot;MANAGED_AUTHENTICATION&quot; |



