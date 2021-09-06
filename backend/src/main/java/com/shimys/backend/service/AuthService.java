package com.shimys.backend.service;

import com.shimys.backend.domain.User;
import com.shimys.backend.repository.UserRepository;
import com.shimys.backend.util.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${email.google.id}")
    private String googleId;
    @Value("${email.google.password}")
    private String googlePassword;

    /**
     * 유저 정보를 받아 유저네임 중복 검사 및 유저 생성
     * @param user
     * @return
     */
    @Transactional
    public User 회원가입(User user){
        if(userRepository.findByUsername(user.getUsername()) != null){
            throw new CustomException("이미 사용중인 Username 입니다.");
        }

        // 패스워드 암호화
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);

        // 권한설정
        user.setRole("ROLE_USER");
        user.setAvailable(true);

        return userRepository.save(user);
    }

    /**
     * 이메일 주소를 받아 이메일 중복여부 검사 및 해당 이메일로 인증코드 전송
     * @param email 이메일 주소
     * @return 인증코드
     */
    @Transactional
    public Integer 이메일인증(String email){
        if(userRepository.findByEmail(email) != null){
            return -1;
        }

        // 인증번호 생성
        int code = (int)(Math.random()*999999+100000);
        // SMTP 서버 정보를 설정한다.
        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", 465);
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getDefaultInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(googleId, googlePassword);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(googleId));
            // 수신자 메일 주소
            message.addRecipients(Message.RecipientType.TO, String.valueOf(new InternetAddress(email)));
            // 메일 제목
            message.setSubject("[The Challenge] 인증 번호를 안내드립니다.");
            // 메일 내용
            message.setText("인증번호 : " + code);

            // 전송
            Transport.send(message);
        } catch (AddressException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return code;
    }
}
