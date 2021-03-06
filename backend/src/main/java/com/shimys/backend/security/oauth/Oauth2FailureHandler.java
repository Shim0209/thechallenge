package com.shimys.backend.security.oauth;

import com.shimys.backend.security.jwt.JwtProperties;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class Oauth2FailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if(exception.getMessage().equals("이메일 중복")) {
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/fail")
                    .build().toUriString();
            getRedirectStrategy().sendRedirect(request,response,targetUrl);
        } else {
            System.out.println("에러 메세지 : "+exception.getMessage());
            System.out.println("에러 클래스 : "+exception.getClass());
        }
    }
}
