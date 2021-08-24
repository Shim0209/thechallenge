package com.shimys.backend.security.oauth.provider;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.UUID;

public class GoogleUserInfo implements OAuth2UserInfo{
    private Map<String, Object> attribute;

    public GoogleUserInfo(Map<String, Object> attribute) {
        this.attribute = attribute;
    }

    @Override
    public String getUsername() {
        return "google_"+(String) attribute.get("sub");
    }

    @Override
    public String getPassword() {
        return new BCryptPasswordEncoder().encode(UUID.randomUUID().toString());
    }

    @Override
    public String getName() {
        return (String) attribute.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attribute.get("email");
    }
}
