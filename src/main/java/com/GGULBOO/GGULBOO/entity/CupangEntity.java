package com.GGULBOO.GGULBOO.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(name ="Cupang_Table") // 쿠팡 커넥트 테이블
public class CupangEntity {
    @Id // pk지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 시퀀스의 역할 auto_increment
    @Column(name="id" , nullable = false)
    private Long id;
    @Column(name="date" , nullable = false) // 날짜
    private Date date;
    @Column(name="email" , nullable = false) // 회원 이메일
    private String email;
    @Column(name="income" , nullable = true) //  수입
    private Long income ;
    @Column(name="expenditure" , nullable = true) // 지출
    private Long expenditure;
    @Column(name="expenditureReason" , nullable = true) // 지출사유
    private String expenditureReason;
}


