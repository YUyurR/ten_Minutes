import UserInfo from '../Main/MyPage_directory/User_Info/UserInfo.js';
import MyPage from '../Main/MyPage_directory/MyPage.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckPassword from '../Main/MyPage_directory/User_Info/CheckPassword.js';
import CheckPassword_delete from '../Main/MyPage_directory/User_Info/CheckPassword_delete.js';
import EditInfo from '../Main/MyPage_directory/User_Info/EditInfo.js';
import ConfirmDelete from '../Main/MyPage_directory/User_Info/ConfirmDelete.js';
const Stack = createNativeStackNavigator();

function RootStack_mypage() {
  return (
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: '마이페이지',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          title: '개인 정보 관리',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CheckPassword"
        component={CheckPassword}
        options={{
          title: '비밀번호 확인',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CheckPassword_delete"
        component={CheckPassword_delete}
        options={{
          title: '비밀번호 확인',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditInfo"
        component={EditInfo}
        options={{
          title: '개인정보 수정',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ConfirmDelete"
        component={ConfirmDelete}
        options={{
          title: '회원탈퇴 완료',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack_mypage;
