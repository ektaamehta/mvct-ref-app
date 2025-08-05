/* (C)2024 */
package com.mastercard.mcs.virtualcardtokens.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.OkHttp3ClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import okhttp3.OkHttpClient;

@Configuration
public class HttpClientConfig {
 
    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient.Builder()
                // you can customize timeouts, interceptors, etc. here
                .build();
    }

	@SuppressWarnings({"deprecation", "removal"})
    @Bean
    public RestTemplate restTemplate(OkHttpClient okHttpClient) {
        var factory = new OkHttp3ClientHttpRequestFactory(okHttpClient);
        return new RestTemplate(factory);
    }
}
