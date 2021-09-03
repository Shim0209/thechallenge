package com.shimys.backend.config;

import com.shimys.backend.repository.UserRepository;
import com.shimys.backend.security.auth.AuthenticationFilter;
import com.shimys.backend.security.auth.AuthorizationFilter;
import com.shimys.backend.security.oauth.Oauth2DetailsService;
import com.shimys.backend.security.oauth.Oauth2FailureHandler;
import com.shimys.backend.security.oauth.Oauth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsConfig corsConfig;
    private final UserRepository userRepository;
    private final Oauth2DetailsService oauth2DetailsService;
    private final Oauth2SuccessHandler oauth2SuccessHandler;
    private final Oauth2FailureHandler oauth2FailureHandler;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /**
     * 스프링 시큐리티 설정
     * - 리소스(URL) 접근 권한 설정
     * - 인증 전체 흐름 설정
     * - 인증 로직 커스텀 필터 설정
     * - csrf, https 등
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 스프링 시큐리티 설정
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .addFilter(corsConfig.corsFilter()) // 모든 요청이 해당 필터를 거쳐간다.
            .formLogin().disable() // 폼로그인 사용 안함
            .httpBasic().disable() // 기본적인 http 로그인 사용 안함??
            .addFilter(new AuthenticationFilter(authenticationManager()))
            .addFilter(new AuthorizationFilter(authenticationManager(), userRepository));

        // 리소스 권한 설정
        http
            .authorizeRequests()
                .antMatchers("/auth/**","challenge/create").permitAll() // 해당 요청은 인증없이 접근가능
                .antMatchers().hasAnyRole() // 특정 권한을 가진 사용자만 접근가능
                .antMatchers().hasAnyRole() // 특정 권한을 가진 사용자만 접근가능
                .antMatchers().hasAnyRole() // 특정 권한을 가진 사용자만 접근가능
                .anyRequest().authenticated(); // 위의 요청 이외의 모든 요청은 인증된 사용자만 접근가능


        // oauth2 설정
        http
            .oauth2Login()
                .userInfoEndpoint() // oauth2 로그인시 최응응답으로 회원정보를 바로 받도록 설정. -> oauth2 인증과정 중 code 받기, access토큰 받기를 스프링에게 위임
                    .userService(oauth2DetailsService)
                    .and()
                .successHandler(oauth2SuccessHandler) // oauth2 로그인에 성공하면 동작할 핸들러 등록
                .failureHandler(oauth2FailureHandler);
    }
}
