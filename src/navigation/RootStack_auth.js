import LoginPage from '../Login/LoginPage';
import SignUpPage from '../SignUp/SignUpPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function RootStack_auth() {
  return (
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack_auth;
