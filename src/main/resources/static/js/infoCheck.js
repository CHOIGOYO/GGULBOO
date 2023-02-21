// 회원가입 sumit Check
function SignUpFormSumitCheck(){
    //const email = document.getElementById("태그의 아이디값").value
     const userEmail = document.getElementById("userEmail").value;
     const userPw = document.getElementById("userPw").value;
     const confirmPassword = document.getElementById("confirmPassword").value;
     console.log("SignUpFormSumitCheck() 호출성공"); // 호출까지는 되었음 
     var isSubmit = false; //  초기값
     $.ajax({
              type:"post",
              url:"/SignUpForm/SignUpFormSumitCheck",
              data: {
                  "userEmail": userEmail, // "전송되는 파라미터 값 이름 ": 파라미터
                  "userPw":userPw,
                  "confirmPassword":confirmPassword
              },
              async: false,
              success :
              function(res){
                  console.log("요청성공 : ", res);
                  if(res == "Emailno"){
                        alert("이메일을 확인해주세요.");
                        isSubmit = false;
                        // $("#userEmail").focus();
                        document.getElementById("userEmail").focus();
                  }
                  if(res == "PWno"){
                        alert("비밀번호를 확인해주세요.");
                        console.log("res : ",res);
                        isSubmit = false;
                        // $("#confirmPassword").focus();
                        document.getElementById("confirmPassword").focus();
                  }
                  else{
                        alert("회원가입 성공.");
                        console.log("res : ",res);
                        isSubmit = true;
                  }

              },
              error : function(err){
                 console.log("에러발생: ",err);
                 }
     })
     return isSubmit;  
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