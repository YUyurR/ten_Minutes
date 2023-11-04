/*@format*/

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import RootStack_Primary from './src/navigation/RootStack_primary';
import RootStack_mypage from './src/navigation/RootStack_mypage';
import RootStack_auth from './src/navigation/RootStack_auth';
const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="RootStack_auth">
        <RootStack.Screen
          component={RootStack_auth}
          name="Auth"
          options={{headerShown: false}}
        />
        <RootStack.Screen
          component={RootStack_Primary}
          name="Primary"
          options={{headerShown: false}}
        />
        <RootStack.Screen
          component={RootStack_mypage}
          name="Mypage"
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
