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

function LoginPage({navigation}) {
  let loginForm = {
    id: null,
    password: null,
  };

  const [signedUp, setSignup] = useState(false);
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

  const handleSubmit = () => {
    if (validateForm()) {
      loginForm.id = id;
      loginForm.password = password;

      let login = LoginRequest({loginForm});
      login;
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
              navigation.navigate('SignUpPage');
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
        <Button //개발용 로그인 없이 메인화면 접속하는 버튼. 발표할때 지우기
          title="개발용 바로진입"
          style={'border:#ccc'}
          backgroundColor="white"
          onPress={() => navigation.navigate('MainPage')}
        />
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
  upperButtons: {
    marginBottom: 10, //적용 왜 안되는지 나중에 보기
  },
  errorText: {
    color: 'red',
    marginBottom: 7,
  },
});

export default LoginPage;
