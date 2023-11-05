import React from 'react';
import MainPage from '../Main/MainPage.js';
import GarbageDetect from '../Main/Detect_Garbage/GarbageDetect.js';
import AnimalCare from '../Main/Animal_care/AnimalCare';
import ViewLocataionData from '../Main/Find_Garbage_Can/ViewLocataionData';
import ManualList from '../Main/Manual/ManualList.js';
import DetailPage from '../Main/Manual/DetailPage.js';
//import LoginKakao from './Login/LoginKakao';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack_Primary() {
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GarbageDetect"
        component={GarbageDetect}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnimalCare"
        component={AnimalCare}
        options={{
          title: '동물 캐릭터 키우기',
        }}
      />
      <Stack.Screen
        name="ViewLocataionData"
        component={ViewLocataionData}
        options={{
          title: '공공쓰레기통 찾기',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ManualList"
        component={ManualList}
        options={{
          title: '분리배출 매뉴얼',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{
          title: '매뉴얼 상세정보',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack_Primary;
