// 회원가입 sumit Check
function SignUpFormSumitCheck() {
    const userEmail = document.getElementById("userEmail").value;
    const userPw = document.getElementById("userPw").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    console.log("SignUpFormSumitCheck() 호출성공");
  
    $.ajax({
      type: "post",
      url: "/SignUpForm/SignUpFormSumitCheck",
      data: {
        "userEmail": userEmail,
        "userPw": userPw,
        "confirmPassword": confirmPassword
      },
      success: function(res) {
        console.log("요청성공 : ", res);
        if (res == "Emailno") {
          alert("이메일을 확인해주세요.");
          document.getElementById("userEmail").focus();
        } else if (res == "PWno") {
          alert("비밀번호를 확인해주세요.");
          document.getElementById("confirmPassword").focus();
        } else {
          alert("회원가입 성공.");
          console.log("res : ", res);
          $("#SignUpForm").submit();
        }
      },
      error: function(err) {
        console.log("에러발생: ", err);
      }
    });
  
    return false; // ajax 요청을 기다리는 동안 기존의 submit 이벤트는 막음
  }
  
 //이메일 중복회원 여부 확인(span.innerHtml)
function emailDuplicateCheck(){
     //const email = document.getElementById("태그의 아이디값").value
     const userEmail = document.getElementById("userEmail").value;
     // <span id="checkResult">      </span>에 출력하기
     const checkResult = document.getElementById("checkResult");
     console.log("입력값 :" , userEmail);
     $.ajax({ // jquery에서 제공하는 ajax 함수 순수 자바스크립트 코드보다 사용하기 편함
         // 요청방식 : post , 주소 url: /SignUpForm/emailDuplicateCheck , 보내는데이터 : userEmail
         type:"post",
         url:"/SignUpForm/emailDuplicateCheck",
         data: {
             "userEmail": userEmail // "전송되는 파라미터 값 이름 ": 파라미터
         },
         success : function(res){
             console.log("요청성공 : ", res);
             if(res == "ok"){
                 console.log("사용가능한 이메일입니다.");
                 checkEmail.style.color = "green";
                 checkEmail.innerHTML="사용가능한 이메일입니다.";
             } else {
                 console.log("이미 사용중인 이메일입니다.");
                 checkEmail.style.color = "red";
                 checkEmail.innerHTML="이미 사용중인 이메일입니다.";
             }

         },
         error : function(err){
            console.log("에러발생: ",err);
            }

     })
}

 //비밀번호 확인(span.innerHtml)
 function  chackPassword(){
       var userPw = document.getElementById("userPw");
       var confirmPassword = document.getElementById("confirmPassword");
       var confrimMsg = document.getElementById('confirmMsg');
       var correctColor = "green";	//맞았을 때 출력되는 색깔.
       var wrongColor ="red";	//틀렸을 때 출력되는 색깔
       if(userPw.value == confirmPassword.value){
           confirmMsg.style.color = correctColor;/* span 태그의 ID(confirmMsg) 사용  */
           confirmMsg.innerHTML ="비밀번호 일치";
       } else{
		confirmMsg.style.color = wrongColor;
		confirmMsg.innerHTML ="비밀번호 불일치";
	   }
 }

	$(document).ready(function() {
		$('#userPw').on('keyup', function() {
			var userPw = $(this).val();
			var strength = '';
			if (userPw.length < 6) {
				strength = '비밀번호는 8자리 이상이어야합니다.';
				$('#password-strength').css('color', 'red');
			} else if (userPw.length >= 8) {
				strength = '완벽해요!';
				$('#password-strength').css('color', 'green');
			}
			$('#password-strength').text(strength);
		});
	});