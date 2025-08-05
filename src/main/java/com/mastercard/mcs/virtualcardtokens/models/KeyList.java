package com.mastercard.mcs.virtualcardtokens.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class KeyList {
    @JsonProperty("keys")
    private List<Key> keys;

}
