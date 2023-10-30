import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

import ValidateFormat from './ValidateFormat.js';

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
          status +
          ']',
      );
      if (status === 200) {
        toLogin = true;
        console.log('response  (in IF절): ' + response);
        console.log('response.status (in IF절): ' + response.status);
        console.log('data--성공: ' + response.ok);
        return true;
      } else {
        console.log('회원가입 실패');
      }
      //return true;
    })

    .catch(error => {
      console.error(`${error}--signupRequest측 에러 발생`);
    });
}
export default SignupRequest;
