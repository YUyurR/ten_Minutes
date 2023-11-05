import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from 'react-native';
import ShowAnimalProfile from './Animal_care/ShowAnimalProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
const URL = 'http://ceprj.gachon.ac.kr:60001/main';

// async function GetNumValues() {
//   const myToken = await AsyncStorage.getItem('accessToken');
//   const sendto = 'http://ceprj.gachon.ac.kr:60001/main';

//   const options = {
//     method: 'GET',
//     headers: {
//       Who: 'User', // 최근에 추가된 속성
//       'Content-Type': 'application/json',
//       Authorization: myToken,
//     },
//   };

//   try {
//     const response = await fetch(sendto, options);
//     const responseObject = await response.json();
//     const status = responseObject.status;
//     console.log(
//       `[response 형식: ${typeof responseObject}, ${JSON.stringify(
//         responseObject,
//       )}, ${status}]`,
//     );

//     if (status === 200) {
//       console.log('response (in IF절): ' + JSON.stringify(responseObject));
//       console.log('response.status (in IF절): ' + status);
//       console.log('data--성공: ' + response.ok);
//       console.log('Token ok.');
//     }
//   } catch (error) {
//     console.error(`${error}--포인트와 병뚜껑 정보를 가져오지 못했습니다.`);
//   }
// }

function MainPage({navigation}, {route}) {
  const [bottlecap, setBottlecap] = useState();
  const [point, setPoint] = useState();

  return (
    <View>
      <Pressable onPress={() => navigation.push('AnimalCare')}>
        <ShowAnimalProfile />
      </Pressable>

      <Text style={styles.capNumber}>병뚜껑:{bottlecap}개</Text>
      <Text style={styles.capNumber}>성장포인트:{point}개</Text>
      <Button
        title="분리배출 매뉴얼"
        onPress={() => navigation.push('Primary', {screen: 'ManualList'})}
        style={styles.buttons}
      />

      <Button
        title="공공쓰레기통 위치 확인"
        onPress={() =>
          navigation.push('Primary', {screen: 'ViewLocataionData'})
        }
      />
      <Button
        title="마이페이지"
        onPress={() => navigation.push('Mypage', {screen: 'MyPage'})}
      />
      <Button
        title="쓰레기 분류하기"
        onPress={() => navigation.push('GarbageDetect', {id: 1})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  capNumber: {
    fontSize: 18,
  },
  capIcon: {
    height: 25,
    width: 25,
  },
  bottleCap: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
});

export default MainPage;
