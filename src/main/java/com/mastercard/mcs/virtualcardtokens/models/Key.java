package com.mastercard.mcs.virtualcardtokens.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class Key {
    @JsonProperty("kty")
    private String kty;

    @JsonProperty("e")
    private String exponent;

    @JsonProperty("use")
    private String use;

    @JsonProperty("kid")
    private String kid;

    @JsonProperty("key_ops")
    private List<String> keyOps = null;

    @JsonProperty("alg")
    private String alg;

    @JsonProperty("n")
    private String modulus;

    @Override
    public String toString() {
        return "Key{"
                + "kty='" + kty + '\''
                + ", exponent='" + exponent + '\''
                + ", use='" + use + '\''
                + ", kid='" + kid + '\''
                + ", keyOps=" + keyOps
                + ", alg='" + alg + '\''
                + ", modulus='" + modulus + '\''
                + '}';
    }
}
