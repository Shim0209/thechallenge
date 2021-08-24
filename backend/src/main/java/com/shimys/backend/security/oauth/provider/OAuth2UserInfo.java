package com.shimys.backend.security.oauth.provider;

public interface OAuth2UserInfo {

    String getUsername();
    String getPassword();
    String getName();
    String getEmail();
}
