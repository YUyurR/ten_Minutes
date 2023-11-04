function SignupRequest(signupForm) {
  const sendto = 'http://ceprj.gachon.ac.kr:60001/account';

  console.log(sendto + '에 연결 준비');
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(signupForm),
  };

  console.log(JSON.stringify({signupForm}));

  fetch(sendto, options)
    .then(response => {
      const responseString = JSON.stringify({response}); //내용 및 상태 확인
      const responseObject = JSON.parse(responseString);
      const status = responseObject.response.status;
      console.log(
        'response 형식: ' +
          typeof {response} +
          '\n' +
          JSON.stringify({response}) +
          '\n' +
          status +
          ']',
      );
      if (status === 200) {
        toLogin = true;
        console.log('response  (in IF절): ' + response);
        console.log('response.status (in IF절): ' + response.status);
        console.log('data--성공: ' + response.ok);
      } else {
        console.log('회원가입 실패');
      }
    })
    .catch(error => {
      console.error(`${error}-SignupRequest.js에서 오류 발생`);
    });
}
export default SignupRequest;
