package com.GGULBOO.GGULBOO.controller;

import com.GGULBOO.GGULBOO.dto.UserDTO;
import com.GGULBOO.GGULBOO.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor //    생성자 주입 방식 사용
public class MemberController {
//    생성자 주입 방식 사용
    private final UserService userService;
//    회원가입 폼에서 입력받은 값을 받아서 저장

    //    메인페이지 요청
    @GetMapping("/")
    public String index(){
        return "index"; // templates에 index.html을 찾아 반환
    }

    //    회원가입 폼으로 이동
    @GetMapping("/SignUpForm")
    public String signUp(){
        return "user/signUpForm";
    }

    //    로그인 폼으로 이동
    @GetMapping("/LoginForm")
    public String login(){ return "user/loginForm"; }


    // 회원가입을 위한 메서드 1 입력받은 값을 userService에 넘긴다
    @PostMapping("/member/save") // 요청이 들어오면 메서드를 실행하겠다
    public String save(@ModelAttribute UserDTO userDTO){ // SignUpForm에서 입력받은 값의 name이 DTO의 멤버 명과 같을 때 세팅됨
        System.out.println("MemberController.save");
        System.out.println("userDTO = " + userDTO);
        userService.save(userDTO); // service객체에 dto객체를 넘김
        return "user/loginForm";
    }

//    회원가입 시 이메일 중복체크
    @PostMapping("/SignUpForm/emailDuplicateCheck")
    public @ResponseBody String emailDuplicateCheck(@RequestParam("userEmail") String userEmail){ // @ResponseBody ajax사용시 필요 어노테이션
        System.out.println("userEmail = " + userEmail);
        String checkResult = userService.emailDuplicateCheck(userEmail);
        return checkResult;
//        if (checkResult != null) {
//            return "사용 가능";
//        } else {
//            return "사용 불가";
//        }
    }


    // 로그인을 위한 메서드 : userService에서 처리한 값에따라 view결과 반환
    @PostMapping("/member/login")
    public String login(@ModelAttribute UserDTO userDTO, HttpSession session){
        //userService에서 받아옴
        UserDTO loginResult = userService.login(userDTO);
        if (loginResult != null) {
            //login 성공 session의 loginEmail에 파라미터를 담음
            session.setAttribute("loginEmail",loginResult.getUserEmail()); // 로그인 성공시 세션정보 유지
            return "user/main";
        } else {
            // login 실패
            return "user/loginForm";
        }
    }

    //  마이페이지로 이동 // 세션값을 유지해야한다 // 회원이메일로 회원정보를 가져와 뷰페이지에 보이기
    @GetMapping("/toMyPage")
    public String myPage(HttpSession session, Model model){
        Object loginEmail = session.getAttribute("loginEmail"); // 세션유지) 회원의정보를 얻어오기
        String myEmail = (String)loginEmail; // 강제 형변환
        UserDTO userDTO = userService.userInfoUpDateForm(myEmail); // DB에서 email정보로 회원정보를 찾아옴
        model.addAttribute("upDateUser", userDTO); // 가져온 값을 upDateUser에 담는다
        return "user/myPage"; // model객체가 값을 넘겨줄 뷰페이지 리턴
    }

    // 회원정보 수정 후 마이페이지 반환
    @PostMapping("/member/update")
    public String upDateUserInfo(@ModelAttribute UserDTO userDTO){
        userService.userInfoUpDate(userDTO);  // 수정버튼 눌렀을 때 디비에 업데이트 되는 메서드 호출
        return "redirect:/toMyPage"; // 수정된 정보가 확인되는 마이페이지 반환
    }

    // 회원탈퇴 요청받으면 실행 될 메서드
    @GetMapping("/user/delete/{userId}")
    public String deleteById(@PathVariable Long userId){
        userService.deleteById(userId); // 회원정보를 디비에서 삭제하는 서비스 메서드
        return "index"; // 회원탈퇴 후 index페이지로 반환
    }

//   로그아웃요청 // 세션 초기화
    @GetMapping("/logOut")
    public String logOut(HttpSession session){
        session.invalidate(); // 세션 무효화
        return "index";
    }


}