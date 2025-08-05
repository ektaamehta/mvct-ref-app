

# MfaEligibilityModel

List of all available Multi-factor Authentication methods with their eligibility statuses.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**authenticatingEntityId** | **String** | Unique identifier for the entity verifying a person as an authorized cardholder using a Mastercard-approved Multi-factor Authentication method in a remote commerce token transaction. |  [optional] |
|**certifiedMfaMethodId** | **String** | Unique identifier identifying the certified MFA method. Registered after the successful certification of the MFA Method. |  [optional] |
|**isMultiFactorAuthenticationSupported** | **Boolean** | Flag indicating whether the Multi Factor Authentication is supported for the Account PAN |  |
|**isLiabilityShiftEligible** | **Boolean** | Flag indicating whether the Multi Factor Authentication method &amp; account PAN are eligible for Fraud Liability Protection |  |



