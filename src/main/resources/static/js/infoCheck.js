function SignUpFormSumitCheck(event) {
  // 폼 제출을 막기 위해 event.preventDefault() 호출
  event.preventDefault();

  // 입력된 이메일, 비밀번호, 비밀번호 확인 값을 가져옴
  const userEmail = document.getElementById("userEmail").value;
  const userPw = document.getElementById("userPw").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

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
//      event.preventDefault();

    } else if (res == "PWno") {
      // 비밀번호가 유효하지 않으면 경고창을 띄우고, 비밀번호 확인 입력 필드에 포커스
      alert("비밀번호를 확인해주세요.");
      document.getElementById("confirmPassword").focus();
//      event.preventDefault();

    } else {
      // 모든 입력이 유효하면 회원가입이 성공적으로 이루어졌음을 알리고, 폼을 전송(submit)함
      alert("회원가입 성공.");
      console.log("res : ", res);
//     조건에 맞으므로 submit()호출
      document.getElementById("SignUpForm").submit();
    }
  }).catch((err) => {
    // Promise 객체가 reject되면 에러를 출력
    console.log("에러발생: ", err);
  });
}