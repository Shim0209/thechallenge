package com.shimys.backend.security.auth;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.shimys.backend.domain.User;
import com.shimys.backend.repository.UserRepository;
import com.shimys.backend.security.jwt.JwtTokenUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import com.auth0.jwt.exceptions.SignatureVerificationException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 시큐리티의 BasicAuthenticationFilter는 권한이나 인증이 필요한 요청이 들어오면 동작한다.
 */
public class AuthorizationFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;

    public AuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            // 요청에 토큰이 없으면 동작
            if(!JwtTokenUtil.checkRequestExistToken(request)){
                chain.doFilter(request,response);
                return;
            }

            // Jwt 토큰에서 username 추출
            String username = JwtTokenUtil.getUsernameByToken(request);

            // username으로 authentication 객체 만들어서 secutityContext에 담기
            if(username != null){
                User userEntity = userRepository.findByUsername(username);

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

                // Jwt 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어준다.
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);

                chain.doFilter(request,response);
            } else {
                chain.doFilter(request,response);
            }
        } catch (SignatureVerificationException e) {

            e.printStackTrace();
        } catch (TokenExpiredException e) {
            throw new TokenExpiredException("JWT 토큰 만료");
        }
    }

    @Override
    protected void onUnsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        System.out.println("onUnsuccessfulAuthentication 동작 : " + failed.getMessage() + ", " + failed.getClass());
    }
}
