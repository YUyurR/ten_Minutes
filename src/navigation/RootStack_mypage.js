import UserInfo from '../Main/MyPage_directory/User_Info/UserInfo.js';
import DeleteAccount from '../Main/MyPage_directory/User_Info/Delete_Account/DeleteAccount.js';
import MyPage from '../Main/MyPage_directory/MyPage.js';
import UserInfoEdit from '../Main/MyPage_directory/User_Info/UserInfoEdit.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckPassword from '../Main/MyPage_directory/User_Info/CheckPassword.js';
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
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          title: '회원 탈퇴',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UserInfoEdit"
        component={UserInfoEdit}
        options={{
          title: '수정하기',
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
    </Stack.Navigator>
  );
}

export default RootStack_mypage;
