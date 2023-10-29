function SignupRequest(signupForm) {
  const token = 'GachonCe@23201B00kclub';
  const sendto = 'http://ceprj.gachon.ac.kr:60001/signup';

  //const bodysend = JSON.stringify(signupForm);

  console.log(sendto + '에 연결 준비');
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(signupForm),
  };

  console.log(JSON.stringify({signupForm}));

  fetch(sendto, options)
    .then(response => {
      const responseString = JSON.stringify({response});
      const responseObject = JSON.parse(responseString);
      const status = responseObject.response.status;
      console.log(
        'response 형식: ' +
          typeof {response} +
          '\n' +
          JSON.stringify({response}) +
          '\n' +
          '\n' +
          status +
          '\n' +
          '\n',
      );
      if (status === 200) {
        console.log('response  (in IF절): ' + response);
        console.log('response.status (in IF절): ' + response.status);
        console.log('data--성공: ' + response.ok);
      } else {
        console.log('회원가입 실패');
      }
      return JSON.stringify(response.json());
    })
    // .then(response => {
    //   const responseString = JSON.stringify(response);
    //   const responseObject = JSON.parse(responseString);
    //   const status = responseObject.response.status;
    //   console.log('response _ status (before IF절): ' + status);
    //   // const res = response.status;
    //   // console.log('response.status (before IF절): ' + response.status);

    //   if (status === 200) {
    //     console.log('response  (in IF절): ' + response);
    //     console.log('response.status (in IF절): ' + response.status);
    //     console.log('data--성공: ' + response.ok);
    //   } else {
    //     console.log('회원가입 실패');
    //   }
    // })
    .catch(error => {
      console.error(`${error}--에러 발생`);
    });
}
export default SignupRequest;
