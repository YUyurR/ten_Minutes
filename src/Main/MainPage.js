import React from 'react';
import {View, Button, StyleSheet, Text, Pressable, Image} from 'react-native';
import ShowAnimalProfile from './Animal_care/ShowAnimalProfile';

function MainPage({navigation}) {
  let dummyBottlecap;

  return (
    <View>
      <Pressable onPress={() => navigation.push('AnimalCare')}>
        <ShowAnimalProfile />
      </Pressable>
      <View style={styles.bottleCap}>
        <Image
          source={require('../assets/bottlecap_icon.png')}
          style={styles.capIcon}
        />
        <Text style={styles.capIcon}>병뚜껑:{dummyBottlecap}개</Text>
      </View>

      <Button
        title="분리배출 매뉴얼"
        onPress={() => navigation.push('')}
        style={styles.buttons}
      />

      <Button
        title="공공쓰레기통 위치 확인"
        onPress={() => navigation.push('ViewLocataionData')}
      />
      <Button title="마이페이지" onPress={() => navigation.push('MyPage')} />
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
  capIcon: {
    fontSize: 20,
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
