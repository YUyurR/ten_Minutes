import AsyncStorage from '@react-native-async-storage/async-storage';

async function LoginRequest(loginForm) {
  const sendto = 'http://ceprj.gachon.ac.kr:60001/';
  console.log(sendto + '에 로그인 준비');
  const options = {
    method: 'POST',
    headers: {
      //Accept: 'application/json',
      Who: 'User', //최근에 추가된 속성
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginForm), //로그인폼 전송
  };

  let myToken = async response => {
    // response 매개변수를 받도록 수정
    const responseData = await response.json();
    const accessToken = responseData;
    try {
      await AsyncStorage.setItem('accessToken', JSON.stringify(accessToken));
      console.log('토큰 저장 완료');
    } catch (e) {
      console.log(e);
    }
  };

  return fetch(sendto, options)
    .then(async response => {
      console.log('response 있음');
      // const responseString = JSON.stringify({ response }); // 이 부분은 제거 가능
      // const responseObject = JSON.parse(responseString); // 이 부분은 제거 가능
      const status = response.status;

      if (status === 200) {
        console.log('로그인합니다...');
        await myToken(response); // response를 myToken 함수로 전달

        // AsyncStorage에서 accessToken 가져올 때 JSON 파싱을 추가
        const accessTokenJSON = await AsyncStorage.getItem('accessToken');
        const accessToken = JSON.parse(accessTokenJSON);

        console.log('토큰:', accessToken);
      } else {
        throw new Error('Login failed');
      }
    })
    .catch(error => {
      console.error(`${error} - LoginRequest.js에서 에러 발생`);
    });
}
export default LoginRequest;
