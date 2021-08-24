package com.shimys.backend.security.oauth;

import com.shimys.backend.domain.User;
import com.shimys.backend.repository.UserRepository;
import com.shimys.backend.security.auth.PrincipalDetails;
import com.shimys.backend.security.oauth.provider.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class Oauth2DetailsService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attribute = oAuth2User.getAttributes();
        OAuth2UserInfo oAuth2UserInfo = null;

        if(userRequest.getClientRegistration().getClientName().equals("Facebook")){
            oAuth2UserInfo = new FacebookUserInfo(attribute);
        } else if(userRequest.getClientRegistration().getClientName().equals("Google")){
            oAuth2UserInfo = new GoogleUserInfo(attribute);
        } else if(userRequest.getClientRegistration().getClientName().equals("Naver")){
            oAuth2UserInfo = new NaverUserInfo((Map<String, Object>) attribute.get("response"));
        } else if(userRequest.getClientRegistration().getClientName().equals("Kakao")){
            oAuth2UserInfo = new KakaoUserInfo(attribute);
        } else {
            //throw CustomException("지원하지 않는 로그인 방식입니다.");
        }

        User userEntity = userRepository.findByUsername(oAuth2UserInfo.getUsername());

        if(userEntity == null){
            User user = User.builder()
                    .username(oAuth2UserInfo.getUsername())
                    .password(oAuth2UserInfo.getPassword())
                    .name(oAuth2UserInfo.getName())
                    .email(oAuth2UserInfo.getEmail())
                    .role("ROLE_USER")
                    .build();

            return new PrincipalDetails(userRepository.save(user), oAuth2User.getAttributes());
        }

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }
}
