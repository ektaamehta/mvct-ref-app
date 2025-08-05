package com.mastercard.mcs.virtualcardtokens.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mastercard.mcs.virtualcardtokens.models.Key;
import com.mastercard.mcs.virtualcardtokens.models.KeyList;

@Service
public final class KeyUtil {

    private final RestTemplate restTemplate;

    public KeyUtil(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public KeyList getKeyList(String url) {
        ResponseEntity<KeyList> response = restTemplate.getForEntity(url, KeyList.class);
        
        return response.getBody();
    }

    public Key getKey(String url, String kid) {
        KeyList keyList = getKeyList(url);
        if (keyList != null && keyList.getKeys() != null) {
            return keyList.getKeys().stream()
                    .filter(key -> kid.equals(key.getKid()))
                    .findFirst()
                    .orElse(null);
        }

        return null;
    }
}
