import React, {useState, useRef} from 'react';
import {
  Keyboard,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import LoginRequest from './LoginRequest.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function AccessMain() {
  const myToken = await AsyncStorage.getItem('accessToken');
  const sendto = 'http://ceprj.gachon.ac.kr:60001/main';

  console.log('\n', myToken, ':토큰꺼내기.');

  const options = {
    method: 'GET',
    headers: {
      Who: 'User', // 최근에 추가된 속성
      Authorization: myToken,
    },
  };

  try {
    const response = await fetch(sendto, options);
    console.log('IN try!!!');
    console.log(JSON.stringify(response));
    const responseObject = await response.json();
    console.log('IN try!!!');
    const status = responseObject.status;
    console.log(
      `[response 형식: ${typeof responseObject}, ${JSON.stringify(
        responseObject,
      )}, ${status}]`,
    );

    if (status === 200) {
      console.log('response (in IF절): ' + JSON.stringify(responseObject));
      console.log('response.status (in IF절): ' + status);
      console.log('data--성공: ' + response.ok);
      setSignin(true); // You need to define setSignin function if it's not defined here.
      console.log('Token ok.');
    }
  } catch (error) {
    console.error(`${error}--GET /main 에서 에러`);
  }
}

function LoginPage({navigation}) {
  let loginForm = {
    id: null,
    password: null,
  };

  const [id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nextRef = useRef('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!id) errors.username = '아이디를 입력하세요.';
    if (!password) errors.password = '비밀번호를 입력하세요.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      loginForm.id = id;
      loginForm.password = password;

      try {
        console.log('loginRequest 실행 전');
        await LoginRequest({loginForm}, {navigation}); // 로그인 요청 및 토큰을 받음
        console.log('loginRequest 실행 후');
        const accessTokenJSON = await AsyncStorage.getItem('accessToken'); //똑같은 라인이 LoginRequest에도 있음..
        const accessToken = JSON.parse(accessTokenJSON); //똑같은 라인이 LoginRequest에도 있음..

        if (!accessToken) {
          console.log('LoginRequest 실패');
        } else {
          console.log('access Token 있음!');
          await AccessMain();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.form}>
        <Image
          source={require('../assets/logo_darker.png')}
          style={styles.image}
        />
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholderTextColor="#666666"
          placeholder="아이디"
          value={id}
          onChangeText={setUsername}
          autoCapitalize="none"
          onSubmitEditing={() => {
            nextRef.current.focus();
          }}
          blurOnSubmit={false}
        />

        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholderTextColor="#666666"
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          ref={nextRef}
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.upperButtons}>
          <Button title="로그인" onPress={handleSubmit} />
          <Button
            title="회원가입"
            onPress={() => {
              navigation.navigate('Auth', {screen: 'SignUpPage'});
            }}
          />
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <Button
          title="카카오톡 로그인"
          // onPress={() => {
          //   navigation.navigate('LoginKakao');
          // }}
        />
        <Button
          title="아이디/비밀번호 찾기"
          // onPress={() => navigation.navigate('FindIDpsw')}
        />
        {/* <Button //개발용 로그인 없이 메인화면 접속하는 버튼. 발표할때 지우기
          title="개발용 바로진입"
          style={'border:#ccc'}
          backgroundColor="white"
          onPress={() => navigation.navigate('Primary', {screen: 'MainPage'})}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 5,
    marginTop: 64,
    Width: '100%',
  },
  input: {
    height: 40,
    color: '#595959',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
  },
  bottomButtons: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  upperButtons: {},
  errorText: {
    color: 'red',
    marginBottom: 7,
  },
});

export default LoginPage;
