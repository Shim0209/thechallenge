package com.shimys.backend.security.oauth;

import com.shimys.backend.security.jwt.JwtProperties;
import com.shimys.backend.security.jwt.JwtTokenUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Oauth2 로그인 성공시 동작
 * jwt 토큰 생성후
 * 클라이언트의 정해져있는 곳으로 jwt 토큰을 담아서 응답
 */
@Component
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // jwt 토큰 생성
        String jwtToken = JwtTokenUtil.createToken(authentication);

        // 응답할 클라이언트 uri 생성 및 헤더에 jwt 토큰 담기
        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect")
                .queryParam(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken)
                .build().toUriString();

        // 생성된 uri로 리다이렉션
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
