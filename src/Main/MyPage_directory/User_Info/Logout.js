// import AsyncStorage from '@react-native-async-storage/async-storage';

// async function LogoutRequest() {
//   let myToken = await AsyncStorage.getItem('accessToken');
//   const sendto = 'http://ceprj.gachon.ac.kr:60001/logout';
//   console.log('myToken(in logoutrequest):', myToken);
//   console.log(sendto);
//   const options = {
//     method: 'POST',
//     headers: {
//       authorization: myToken,
//       Who: 'User',
//       'Content-Type': 'application/json',
//     },
//   };
//   return fetch(sendto, options)
//     .then(async response => {
//       console.log('response 있음');
//       console.log('myToken2(in logoutrequest):', myToken);

//       const responseString = JSON.stringify({response}); //내용 및 상태 확인
//       const responseObject = JSON.parse(responseString);
//       const status = responseObject.response.status;
//       console.log(status);
//       console.log('myToken3(in logoutrequest):', myToken);
//       if (status === 200 && status !== 401) {
//         await AsyncStorage.removeItem('accessToken');
//         console.log('로그아웃합니다. 안녕히 가세요.');
//         navigation.navigate('Primary', {screen: 'LoginPage'}); //메인화면으로
//         //myToken = await AsyncStorage.removeItem('accessToken');
//       } else {
//         throw new Error('Logout failed');
//       }
//     })
//     .catch(error => {
//       //return Promise.reject();
//       console.error(`${error} - LogoutRequest.js에서 에러 발생`);
//     });
// }
// export default LogoutRequest;

import AsyncStorage from '@react-native-async-storage/async-storage';

async function LogoutRequest({navigation}) {
  let myToken = await AsyncStorage.getItem('accessToken');
  const sendto = 'http://ceprj.gachon.ac.kr:60001/logout';
  console.log(sendto);
  const options = {
    method: 'POST',
    headers: {
      Authorization: myToken,
      Who: 'User',
      'Content-Type': 'application/json',
    },
  };
  return fetch(sendto, options)
    .then(async response => {
      console.log('response 있음');
      const responseObject = await response.json(); // JSON 파싱
      const status = response.status;
      console.log(status);

      if (status === 200) {
        // 401 조건 삭제
        await AsyncStorage.removeItem('accessToken');
        console.log('로그아웃합니다. 안녕히 가세요.');
        navigation.navigate('Auth', {screen: 'LoginPage'}); // 메인화면으로
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.error(`${error} - LogoutRequest.js에서 에러 발생`);
    });
}

export default LogoutRequest;
