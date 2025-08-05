package com.mastercard.mcs.virtualcardtokens.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Value("${srcClientId}")
    private String srcClientId;

    @Value("${serviceId}")
    private String serviceId;

    @Value("${srcDpaId}")
    private String srcDpaId;

    @Value("${identityType}")
    private String identityType;

    @Value("${identityValue}")
    private String identityValue;

    @GetMapping
    public Map<String, String> getConfigValues() {
        Map<String, String> configValues = new HashMap<>();
        configValues.put("srcClientId", srcClientId);
        configValues.put("serviceId", serviceId);
        configValues.put("srcDpaId", srcDpaId);
        configValues.put("identityType", identityType);
        configValues.put("identityValue", identityValue);
        
        return configValues;
    }
}
