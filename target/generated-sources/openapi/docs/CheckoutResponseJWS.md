

# CheckoutResponseJWS

It is a JWS signed by Mastercard Checkout Solutions so that the Integrators can validate the integrity of the data in the checkout response.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**joseHeader** | [**JoseHeader**](JoseHeader.md) |  |  |
|**jwsPayload** | [**CheckoutResponseJWSPayload**](CheckoutResponseJWSPayload.md) |  |  |
|**jwsSignature** | **String** | The Mastercard Checkout Solutions (MCS) JWS signature that the Integrator can use to validate the integrity of the data in the checkout response. |  |



