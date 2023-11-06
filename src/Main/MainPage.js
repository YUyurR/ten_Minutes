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

function MainPage({navigation}, {route}) {
  const [bottlecap, setBottlecap] = useState();
  const [point, setPoint] = useState();

  return (
    <View>
      <Pressable onPress={() => navigation.push('AnimalCare')}>
        <ShowAnimalProfile />
      </Pressable>

      <Text style={styles.capNumber} placeholderTextColor="#666666">
        병뚜껑:{bottlecap}개
      </Text>
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
