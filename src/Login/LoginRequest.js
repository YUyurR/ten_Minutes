import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginRequest(loginForm) {
  const token = 'GachonCe@23201B00kclub';
  const sendto = 'http://ceprj.gachon.ac.kr:60001/login';

  console.log(sendto + '에 로그인 준비');
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(loginForm),
  };

  console.log(JSON.stringify({loginForm}));

  fetch(sendto, options)
    .then(response => {
      console.log('response 있음');
      const responseString = JSON.stringify({response});
      const responseObject = JSON.parse(responseString);
      const status = responseObject.response.status;

      console.log(
        '[response 형식: ' +
          typeof {response} +
          '\n' +
          JSON.stringify({response}) +
          '\n' +
          status +
          ']',
      );
      if (status === 200) {
        //네트워크 상태 200일시, 토큰을 받는다.
        console.log('response  (in IF절): ' + response);
        console.log('response.status (in IF절): ' + response.status);
        console.log('data--성공: ' + response.ok);

        AsyncStorage.setItem(
          'accessToken',
          JSON.stringify(({id: userInputId}, secretKey, {expiresIn: '1h'})),
        );
        console.log('토큰 저장 완료, 로그인합니다...');
        navigation.navigate('MainPage');
      } else {
        console.log('로그인 실패');
      }
      return JSON.stringify(response.json());
    })
    .catch(error => {
      console.error(`${error}--loginRequest측 에러 발생`);
    });
}
export default LoginRequest;
