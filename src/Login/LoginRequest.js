import AsyncStorage from '@react-native-async-storage/async-storage';

async function LoginRequest(loginForm, {navigation}) {
  //{navigation}을 인수로 받아야 사용자 인증 후 메인화면으로 넘어갈 수 있다
  const sendto = 'http://ceprj.gachon.ac.kr:60001/';
  console.log(sendto + '에 로그인 준비');
  const options = {
    method: 'POST',
    headers: {
      //Accept: 'application/json',
      Who: 'User',
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
      console.log(typeof status);

      if (status === 200 && status !== 401) {
        console.log('로그인합니다...');
        await myToken(response); // response를 myToken 함수로 전달

        const accessTokenJSON = await AsyncStorage.getItem('accessToken'); //똑같은 라인이 LoginPage에도 있음..
        const accessToken = JSON.parse(accessTokenJSON); //똑같은 라인이 LoginPage에도 있음..

        console.log('토큰:', accessToken);
        navigation.navigate('Primary', {screen: 'MainPage'}); //새로 추가된 라인
      } else {
        throw new Error('Login failed');
      }
    })
    .catch(error => {
      //return Promise.reject();
      console.error(`${error} - LoginRequest.js에서 에러 발생`);
    });
}
export default LoginRequest;
