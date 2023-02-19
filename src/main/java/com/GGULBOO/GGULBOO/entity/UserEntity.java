package com.GGULBOO.GGULBOO.entity;

import com.GGULBOO.GGULBOO.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;
import org.aspectj.apache.bcel.generic.RET;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name ="User_Table") // db에 생성될 테이블 이름
public class UserEntity {
    @Id // pk지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 시퀀스의 역할 auto_increment
    @Column(name="userId" , nullable = false)
    private Long userId; // 회원번호아이디

    @Column(name ="userEmail",nullable = false , unique = true)
    private String userEmail; // 회원이메일
    @Column(name ="userPw",nullable = false)
    private String userPw; // 회원비밀번호
    @Column(name ="userName",nullable = false)
    private String userName; // 회원이름



    public static UserEntity toUserEntity(UserDTO userDTO){
        UserEntity userEntity = new UserEntity();
//        DTO에 담긴 값을 Entity로 세팅하는 과정
        userEntity.setUserId(userDTO.getUserId());
        userEntity.setUserPw(userDTO.getUserPw());
        userEntity.setUserName(userDTO.getUserName());
        userEntity.setUserEmail(userDTO.getUserEmail());
        return userEntity;
    }
}
