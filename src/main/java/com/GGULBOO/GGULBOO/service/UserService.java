package com.GGULBOO.GGULBOO.service;

import com.GGULBOO.GGULBOO.dto.UserDTO;
import com.GGULBOO.GGULBOO.entity.UserEntity;
import com.GGULBOO.GGULBOO.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor // 생성자 주입 사용하기
public class UserService {
    private final UserRepository userRepository; // DI



// 회원가입시 DB저장 메서드
    public void save(UserDTO userDTO){ // dto객체를 받음
//        repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
//        1. dto -> entity 변환
        UserEntity userEntity = UserEntity.toUserEntity(userDTO);
//        2. repository의 save메서드 호출
        userRepository.save(userEntity); // jpa가 제공해주는 save 메서드 외 여러가지가 있음
    }

//    회원가입시 이메일 중복확인 메서드 
    public String emailDuplicateCheck(String userEmail) {
        Optional<UserEntity> byUserEmail = userRepository.findByuserEmail(userEmail);
        if (byUserEmail.isPresent()) { // 조회결과 있으면 중복이메일 사용불가 이메일
            return "no";
        } else { // 조회결과 없으면 사용가능 이메일
            return "ok";
        }
    }

//    로그인 메서드
    public  UserDTO login(UserDTO userDTO){
        Optional<UserEntity> byuserEmail = userRepository.findByuserEmail(userDTO.getUserEmail());
        if (byuserEmail.isPresent()) {
            //조회결과가 있다(해당 이메일을 가진 회원정보가 있다)
            UserEntity userEntity = byuserEmail.get();
            if (userEntity.getUserPw().equals(userDTO.getUserPw())) {
                // 비밀번호가 일치하는 경우
                // 컨트롤러로 넘어가기 위해 entity -> dto 변환작업 필요
                UserDTO dto = UserDTO.toUserDTO(userEntity);
                return dto;
            } else {
                // 비밀번호가 일치하지 않는경우 (로그인 실패)
                return null;
            }
        } else {
            //조회결과가 없다(해당 이메일을 가진 회원정보가 없다)
            return null;
        }
    }

//    회원리스트조회 메서드
    public List<UserDTO> findAll() {
        List<UserEntity> userEntityList = userRepository.findAll();//Repository가 제공하는 메서드
//        리턴해줄 ArrayList생성
        List<UserDTO> userDTOList = new ArrayList<>();
//        변환될 각 멤버들을 담는 작업
        for (UserEntity userEntity : userEntityList) {
            userDTOList.add(UserDTO.toUserDTO(userEntity));
        }
        return userDTOList;
    }


//    아이디값으로 회원정보 조회
    public UserDTO findById(Long userId) {
//        interface에서 지원하는 메서드 findById 사용 반환타입은 Optional
        Optional<UserEntity> optionalUserEntity = userRepository.findById(userId);
        if (optionalUserEntity.isPresent()) {
//            UserDTO로 전환하는 과정 필요
//            UserEntity userEntity = byId.get();
//            UserDTO userDTO = UserDTO.toUserDTO(userEntity);
            return UserDTO.toUserDTO(optionalUserEntity.get());
        } else {
            return null;
        }

    }
    
//    이메일로 회원정보 조회
    public UserDTO userInfoUpDateForm(String myEmail) {
        Optional<UserEntity> optionalUserEntity = userRepository.findByuserEmail(myEmail);
        if (optionalUserEntity.isPresent()) { // Optional 객체가 값을 가지고 있다면 true
            return UserDTO.toUserDTO(optionalUserEntity.get());
        } else {
            return null;
        }
    }

//    회원 )) 수정한 회원정보 업데이트
    public  void userInfoUpDate(UserDTO userDTO) {
        userRepository.save(UserEntity.toUserEntity(userDTO));
    }

//    회원 )) 탈퇴요청 메서드
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }



}
