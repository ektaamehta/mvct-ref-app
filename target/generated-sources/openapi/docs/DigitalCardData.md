

# DigitalCardData

Object for card data including token info, status, card art, and card descriptors.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**status** | **DigitalCardStatus** |  |  [optional] |
|**presentationName** | **String** | The issuer name. |  [optional] |
|**descriptorName** | **String** | Issuers name their card portfolios, and they will create both long descriptions and short descriptions to market their cards to Cardholders. This is the short description for a card. |  [optional] |
|**artUri** | **String** | URI that digitally represents the physical look of a card. This card art image can be used for presentation purposes in user experiences and is provided by Issuers. |  [optional] |
|**artHeight** | **Integer** | Height of the card art in pixels. |  [optional] |
|**artWidth** | **Integer** | Width of the card art in pixels. |  [optional] |
|**pendingEvents** | **List&lt;CardPendingEvent&gt;** | Set of events that are pending completion such as address verification or SCA. |  [optional] |
|**coBrandedName** | **String** | Name of the company partnering with an Issuer for a co-branded card. |  [optional] |
|**isCoBranded** | **Boolean** | Indicates whether the card is co-branded |  [optional] |
|**longDescription** | **String** | Banks name their card portfolios, and they will create both long descriptions and short descriptions to market their cards to Cardholders. This is the long description for a card. |  [optional] |
|**foregroundColor** | **String** | Foreground color used to overlay text on top of the card image. This is always returned in Product Configuration object. |  [optional] |
|**issuerName** | **String** | Name of the issuing bank. |  [optional] |



