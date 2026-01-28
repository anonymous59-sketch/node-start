document.querySelector('form#login').addEventListener('submit', e => {
  e.preventDefault();
  const idInput = document.querySelector('input[name="username"]');
  const pwInput = document.querySelector('input[name="password"]');
  const user_id = idInput.value;
  const user_pw = pwInput.value;
  // console.log(user_id, user_pw);

  // const formData = new FormData();
  // formData.append('user_id', user_id);
  // formData.append('user_pw', user_pw);
  // formData는 기본적으로 header가 multipart/form-data;가 된다. 이미지와 복합 데이터를 넘길때만 사용하자
  fetch('/login', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    // body: formData
    body: JSON.stringify({
      id: user_id,
      pw: user_pw
    })
  })
    .then(res => res.json())
    .then(result => {
      // console.log(result);
      const errorCode = result.retCode
      // console.log(errorCode);
      if(errorCode == 'idNG') {
        alert('아이디를 잘못 입력하셨습니다.')
        idInput.focus();
        localStorage.removeItem('role');
        localStorage.removeItem('uId');
        return;
      } else if(errorCode == 'pwNG') {
        alert('비밀번호를 잘못 입력하셨습니다')
        pwInput.focus();
        return;
      } else if (errorCode == 'OK') {
        alert(`환영합니다 ${result.user_name}님`);
        // 웹브라우저의 session에 값을 삭제
        // localStorage.removeItem('role');
        // localStorage.removeItem('uId'); // localStorage는 속성이 같으면 값을 덮어쓰기 하는 방식으로 작동한다.
        // 웹브라우저의 session에 값을 저장
        localStorage.setItem('role', result.role); // localStorage에 role이라는 이름으로 result.role을 저장한다(setItem).
        localStorage.setItem('uId', user_id)
        idInput.value = '';
        pwInput.value = '';
        console.log(result);
        location.href = 'member.html';
      } else {
        alert('로그인 통신 중 에러가 발생했습니다');
        return;
      }
    })
    .catch(err => console.error(err)
  );
})
// 패스워드 
// 1 : 1234 , 111 : 111, 2: 1234

// try catch와 async await를 이용한 코드 
// const loginForm = document.getElementById("loginForm");

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   try {
//     // json-server에서 사용자 정보를 확인하는 예시 로직
//     // 실제로는 암호화 등을 고려해야 하지만, 테스트용으로 filter 쿼리를 사용합니다.
//     const response = await fetch("login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user_id: username,
//         user_pw: password,
//       }),
//     });
//     const result = await response.json();

//     if (result.retCode == "OK") {
//       alert(`회원님, 환영합니다!`);
//       location.href = "member.html";
//       // 성공 시 메인 페이지로 이동 등 후속 처리
//     } else {
//       alert("아이디 또는 비밀번호가 일치하지 않습니다.");
//     }
//   } catch (error) {
//     console.error("에러 발생:", error);
//     alert("서버와 통신하는 중 문제가 발생했습니다.");
//   }
// });