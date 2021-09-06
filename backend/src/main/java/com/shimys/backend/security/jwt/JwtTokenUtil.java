package com.shimys.backend.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.algorithms.Algorithm;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.util.exception.CustomException;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class JwtTokenUtil {

    /**
     * 유저정보 기반 HASH암호방식 JWT 토큰 생성
     * @param authentication
     * @return
     */
    public static String createToken(Authentication authentication) {
        // 1. Authentication 객체에서 PricipalDetails 객체 추출
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        // 2. PricipalDetails 객체로 토큰 생성
        String jwtToken = JWT.create()
                .withSubject(JwtProperties.SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getId())
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        // 3. 토큰 반환
        return jwtToken;
    }

    /**
     * 요청객체에 JWT 토큰 존재여부 확인
     * @param request
     * @return
     */
    public static boolean checkRequestExistToken(HttpServletRequest request) {
        String jwtHeader = getJwtHeader(request);

        // 헤더에 토큰이 없거나, 토큰이 Bearer로 시작하지 않는 경우 false 반환
        if(jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)){
            return false;
        }
        return true;
    }

    /**
     * JWT 토큰에서 username 추출
     * @param request
     * @return
     */
    public static String getUsernameByToken(HttpServletRequest request){
        String result = "";
        try {
            // 1. 요청헤더에서 토큰 추출
            String jwtHeader = getJwtHeader(request);

            // 2. 토큰 값만 추출
            String jwtToken = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");

            // 3. 토큰 해독 객체 생성
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build();

            // 4. 토큰 검증
            DecodedJWT decodedJWT = jwtVerifier.verify(jwtToken);

            // 5. 토큰 만료시간 검사
            long tokenExpiresTime = JWT.decode(jwtToken).getExpiresAt().getTime();
            long currenTime = new Date().getTime();
            if(tokenExpiresTime <= currenTime){
                throw new CustomException("토큰의 유효시간이 만료되었습니다.");
            }

            result = decodedJWT.getClaim("username").asString();
        } catch (SignatureVerificationException e){
            throw new SignatureVerificationException(Algorithm.HMAC512(JwtProperties.SECRET));
        }

        return result;
    }

    /**
     * JWT 토큰의 헤더 추출
     * @param request
     * @return
     */
    public static String getJwtHeader(HttpServletRequest request) {
        return request.getHeader(JwtProperties.HEADER_STRING);
    }
}
