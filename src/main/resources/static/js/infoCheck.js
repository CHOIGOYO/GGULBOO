function SignUpFormSumitCheck() {
  // 입력된 이메일, 비밀번호, 비밀번호 확인 값을 가져옴
  const userEmail = document.getElementById("userEmail").value;
  const userPw = document.getElementById("userPw").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  helloUser = false;

  // 콘솔에 로그를 출력하여 함수가 호출되었는지 확인
  console.log("SignUpFormSumitCheck() 호출성공");

  // AJAX 호출을 Promise 객체로 감싸기
  const ajaxPromise = new Promise((resolve, reject) => {
    // jQuery를 이용하여 AJAX 요청을 보냄
    $.ajax({
      type: "post",
      url: "/SignUpForm/SignUpFormSumitCheck",
      data: {
        "userEmail": userEmail,
        "userPw": userPw,
        "confirmPassword": confirmPassword
      },
      success: function(res) {
        // 요청이 성공하면 결과를 출력하고, Promise 객체를 resolve
        console.log("요청성공 : ", res);
        resolve(res);
      },
      error: function(err) {
        // 요청이 실패하면 에러를 출력하고, Promise 객체를 reject
        console.log("에러발생: ", err);
        reject(err);
      }
    });
  });

  // Promise 객체가 완료될 때까지 대기하고 결과에 따라 처리
  ajaxPromise.then((res) => {
    if (res == "Emailno") {
      // 이메일이 유효하지 않으면 경고창을 띄우고, 이메일 입력 필드에 포커스
      alert("이메일을 확인해주세요.");
      document.getElementById("userEmail").focus();
      helloUser = false;
    } else if (res == "PWno") {
      // 비밀번호가 유효하지 않으면 경고창을 띄우고, 비밀번호 확인 입력 필드에 포커스
      alert("비밀번호를 확인해주세요.");
      document.getElementById("confirmPassword").focus();
      helloUser = false;
    } else {
      // 모든 입력이 유효하면 회원가입이 성공적으로 이루어졌음을 알리고, 폼을 전송(submit)함
      alert("회원가입 성공.");
      console.log("res : ", res);
      $("#SignUpForm").submit();
      helloUser = true;
    }
  }).catch((err) => {
    // Promise 객체가 reject되면 에러를 출력
    console.log("에러발생: ", err);
  });

  // submit() 함수가 호출되지 않도록 방지
  return helloUser;
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