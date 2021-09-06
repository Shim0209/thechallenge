//package com.shimys.backend.controller;
//
//import com.shimys.backend.util.dto.CommonResponseDto;
//import org.apache.tomcat.util.http.fileupload.FileUtils;
//import org.apache.tomcat.util.http.fileupload.IOUtils;
//import org.aspectj.util.FileUtil;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.IOException;
//import java.io.InputStream;
//
//@RestController
//@RequestMapping("/image")
//public class ImageController {
//
//    @Value("${file.challengeImagePath}")
//    private String challengeImageFolder;
//
//    @GetMapping(value = "/challenge/{url}", produces = MediaType.IMAGE_JPEG_VALUE)
//    public @ResponseBody byte[] getChallengeImage(@PathVariable String url) throws IOException {
//        InputStream in = getClass().getResourceAsStream("/static/images/"+url); // 클래스경로(classpath) 개념 공부할것!
//        System.out.println("in : " + in);
//        System.out.println("주소 : " + challengeImageFolder+url);
//        in.readAllBytes();
//        System.out.println("결과 : " + in.readAllBytes());
//        return in.readAllBytes();
//    }
//}
