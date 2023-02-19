package com.GGULBOO.GGULBOO.dto;

import com.GGULBOO.GGULBOO.entity.UserEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor  // 기본 생성자를 만들어줌
@AllArgsConstructor // 모든 필드를 갖는 생성자를 만들어줌
@ToString
public class UserDTO {
    // SignUpForm에서 입력받은 값의 name이 DTO의 멤버 명과 같을때 세팅됨
    private Long userId ; // user pk number
    private String userPw ; // 회원비밀번호
    private String userName ; // 회원이름
    private String userEmail; // 회원이메일


    public static UserDTO toUserDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(userEntity.getUserId());
        userDTO.setUserPw(userEntity.getUserPw());
        userDTO.setUserName(userEntity.getUserName());
        userDTO.setUserEmail(userEntity.getUserEmail());
        return userDTO;
    }
}
