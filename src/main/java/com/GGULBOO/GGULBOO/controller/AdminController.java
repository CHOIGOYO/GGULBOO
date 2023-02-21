package com.GGULBOO.GGULBOO.controller;


import com.GGULBOO.GGULBOO.dto.UserDTO;
import com.GGULBOO.GGULBOO.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor //    생성자 주입 방식 사용
public class AdminController {
    //    생성자 주입 방식 사용
    private final UserService userService;


    //    회원리스트페이지로 이동
    @GetMapping("/member/list")
    public String findAll(Model model) {
        List<UserDTO> userDTOList = userService.findAll();
        model.addAttribute("userList", userDTOList);
        return "admin/userList";
    }

    // adminPage에 회원 상세조회 클릭시 실행될 메서드
    @GetMapping("/user/{userId}")
    // Model : userId 해당하는 회원의 정보를 db에서 가져와서 화면에 다시 가져와야하므로 사용됨
    public String findById(@PathVariable Long userId, Model model) { // 주소창에 경로상에 있는 값을 가져올 때는 @PathVariable를 사용한다
        UserDTO userDTO = userService.findById(userId);
        model.addAttribute("user", userDTO);
        return "admin/detail";
    }

    //  관리자페이지에서 회원탈퇴시 실행 메서드
    @GetMapping("/admin/user/delete/{userId}")
    public String deleteById(@PathVariable Long userId) {
        userService.deleteById(userId);
        return "redirect:/member/list";
    }

    //   유저 회원가입 이메일 인증 컨트롤러

}
