package com.shimys.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shimys.backend.util.converter.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;
    private String gender;
    private String role;
    private String profileUrl;
    private boolean isAvailable;

    @JsonIgnoreProperties({"host"})
    @OneToMany(mappedBy = "host", fetch = FetchType.LAZY)
    private List<Challenge> challenges;

    private LocalDateTime createDate;
    @PrePersist
    public void createDate(){
        this.createDate = LocalDateTime.now();
    }
}
