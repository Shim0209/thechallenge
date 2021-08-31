package com.shimys.backend.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shimys.backend.domain.User;
import com.shimys.backend.security.jwt.JwtProperties;
import com.shimys.backend.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * /login 요청이 오면 동작하는 필터
 */
@RequiredArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * 1. 로그인 요청이 들어오면
     * 2. 요청객체에서 username(id), password를 받아서
     * 3. Authentication 객체를 만들어서 반환 -> securityContext에 담김.
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // 1. username, password를 받는다.
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(request.getInputStream(), User.class);
            // 2. username, password로 authenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            // 3. authenticationToken토큰으로 authentication 생성
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            // 4. 반환시 자동으로 SecurityContext에 담는다.
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 인증이 정상적으로 동작하면 실행된다.
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // Jwt 토큰 생성
        String jwtToken = JwtTokenUtil.createToken(authResult);

        // 응답헤더에 Jwt 토큰 담아서 클라이언트에 응답
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        if(failed.getClass().equals(BadCredentialsException.class)){
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } else {
            System.out.println("발견하지 못한 에러 발생 : " + failed.getMessage());
        }
    }
}
