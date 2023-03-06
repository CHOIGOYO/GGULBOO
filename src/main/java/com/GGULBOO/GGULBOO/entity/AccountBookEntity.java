package com.GGULBOO.GGULBOO.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(name ="AccountBook_Table") // 장부 테이블
public class AccountBookEntity {
    @Id // pk지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 시퀀스의 역할 auto_increment
    @Column(name="id" , nullable = false)
    private Long id;
    @Column(name="date" , nullable = false) // 날짜
    private Date date;
    @Column(name="income" , nullable = true) //  수입
    private Long income ;
    @Column(name="expenditure" , nullable = true) // 지출
    private Long expenditure;
    @Column(name="expenditureReason" , nullable = true) // 지출사유
    private String expenditureReason;
    @OneToOne(cascade = CascadeType.ALL) // 사용자가 삭제될때 레코드 삭제됨 CascadeType.ALL
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @Column(name="platform" , nullable = true) // 플랫폼(배민,쿠팡잇츠,요기요.. 등)
    private String platform;
//    @Column(name="email" , nullable = false) // 회원 이메일
//    private String email;
}
