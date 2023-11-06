import React from 'react';
import {View, Button} from 'react-native';
import Logout from './User_Info/Logout';

function MyPage({navigation}) {
  return (
    <View>
      <Button title="과거 캐릭터 조회" onPress={() => navigation.push('')} />
      <Button title="분리배출 히스토리" onPress={() => navigation.push('')} />
      <Button
        title="개인정보 조회/관리"
        onPress={() => navigation.push('UserInfo')}
      />
      <Button
        title="로그아웃"
        onPress={() => {
          Logout({navigation});
        }}
      />
      <Button title="문의하기" onPress={() => {}} />
    </View>
  );
}

export default MyPage;
