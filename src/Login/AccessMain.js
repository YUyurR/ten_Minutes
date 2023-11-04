import AsyncStorage from '@react-native-async-storage/async-storage';

function AccessMain() {
  const accessToken = async () => {
    //토큰 불러오기
    try {
      const tokenValue = await AsyncStorage.getItem('accessToken');
      if (tokenValue) return tokenValue; //토큰 내에 필요한 내용이 있으면 true
    } catch (e) {
      console.log('토큰이 없거나 내용이 유효하지 않습니다.');
    }
  };

  const sendto = 'http://ceprj.gachon.ac.kr:60001/main'; //주소를 /login이 아닌 / 루트로 바뀔 예정
  console.log(sendto + '에 토큰 준비');
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Who: 'User', //최근에 추가된 속성
      Authorization: `Bearer ${accessToken}`,
    },
  };

  fetch(sendto, options)
    .then(response => {
      console.log('response 있음');
      const responseString = JSON.stringify({response});
      const responseObject = JSON.parse(responseString);
      const status = responseObject.response.status;

      console.log(
        `[response 형식: ${typeof {response}} ${JSON.stringify({
          response,
        })},${status}]`,
      );
      if (status === 200) {
        //네트워크 상태 200일시, 토큰을 받는다. 반환된 내용 및 상태 확인
        console.log('response  (in IF절): ' + response);
        console.log('response.status (in IF절): ' + response.status);
        console.log('data--성공: ' + response.ok);
        setSignin(true);
        console.log('Token ok.');
      }
      return response;
    })
    .catch(error => {
      console.error(`${error}--토큰 인증 단계에서 에러`);
    });
}

export default AccessMain;
//module.exports = AccessMain;
