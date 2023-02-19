package com.GGULBOO.GGULBOO.repository;

import com.GGULBOO.GGULBOO.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


// repository로 작업을 할때는 entity객체로 받아야된다
public interface UserRepository extends JpaRepository<UserEntity, Long> {
//     Email로 회원 정보 조회
//    select * from User_Table where userEmail=?
     Optional<UserEntity> findByuserEmail(String userEmail);


}
