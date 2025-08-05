package com.mastercard.mcs.virtualcardtokens.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.mastercard.mcs.virtualcardtokens.models.Key;
import com.mastercard.mcs.virtualcardtokens.models.KeyList;

class KeyUtilTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private KeyUtil keyUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("getKeyList should return KeyList when response is valid")
    void getKeyList_shouldReturnKeyList_whenResponseIsValid() {
        KeyList keyList = new KeyList();
        ResponseEntity<KeyList> response = ResponseEntity.ok(keyList);
        when(restTemplate.getForEntity("http://test", KeyList.class)).thenReturn(response);
        KeyList result = keyUtil.getKeyList("http://test");
        assertEquals(keyList, result);
    }

    @Test
    @DisplayName("getKeyList should return null when response body is null")
    void getKeyList_shouldReturnNull_whenResponseBodyIsNull() {
        ResponseEntity<KeyList> response = ResponseEntity.ok(null);
        when(restTemplate.getForEntity("http://test", KeyList.class)).thenReturn(response);
        KeyList result = keyUtil.getKeyList("http://test");
        assertNull(result);
    }

    @Test
    @DisplayName("getKey should return Key when it exists in KeyList")
    void getKey_shouldReturnKey_whenKeyExists() {
        Key key = new Key();
        key.setKid("kid1");
        KeyList keyList = new KeyList();
        keyList.setKeys(Arrays.asList(key));
        ResponseEntity<KeyList> response = ResponseEntity.ok(keyList);
        when(restTemplate.getForEntity("http://test", KeyList.class)).thenReturn(response);
        Key result = keyUtil.getKey("http://test", "kid1");
        assertEquals(key, result);
    }

    @Test
    @DisplayName("getKey should return null when KeyList is null")
    void getKey_shouldReturnNull_whenKeyListIsNull() {
        ResponseEntity<KeyList> response = ResponseEntity.ok(null);
        when(restTemplate.getForEntity("http://test", KeyList.class)).thenReturn(response);
        Key result = keyUtil.getKey("http://test", "kid1");
        assertNull(result);
    }

    @Test
    @DisplayName("getKey should return null when KeyList keys are null")
    void getKey_shouldReturnNull_whenKeysListIsNull() {
        KeyList keyList = new KeyList();
        keyList.setKeys(null);
        ResponseEntity<KeyList> response = ResponseEntity.ok(keyList);
        when(restTemplate.getForEntity("http://test", KeyList.class)).thenReturn(response);
        Key result = keyUtil.getKey("http://test", "kid1");
        assertNull(result);
    }

    @Test
    @DisplayName("getKey should return null when Key not found in KeyList")
    void getKey_shouldReturnNull_whenKeyNotFound() {
        Key key = new Key();
        key.setKid("kid2");
        KeyList keyList = new KeyList();
        keyList.setKeys(Collections.singletonList(key));
        ResponseEntity<KeyList> response = ResponseEntity.ok(keyList);
        when(restTemplate.getForEntity("http://test", KeyList.class)).thenReturn(response);
        Key result = keyUtil.getKey("http://test", "kid1");
        assertNull(result);
    }

    @Test
    @DisplayName("Key.toString should return a string with all fields")
    void keyToString_shouldReturnStringWithAllFields() {
        Key key = new Key();
        key.setKty("RSA");
        key.setExponent("AQAB");
        key.setUse("sig");
        key.setKid("test-kid");
        key.setKeyOps(Arrays.asList("verify", "sign"));
        key.setAlg("RS256");
        key.setModulus("modulus-value");
        String str = key.toString();
        assertTrue(str.contains("kty='RSA'"));
        assertTrue(str.contains("exponent='AQAB'"));
        assertTrue(str.contains("use='sig'"));
        assertTrue(str.contains("kid='test-kid'"));
        assertTrue(str.contains("keyOps=[verify, sign]"));
        assertTrue(str.contains("alg='RS256'"));
        assertTrue(str.contains("modulus='modulus-value'"));
    }
}
