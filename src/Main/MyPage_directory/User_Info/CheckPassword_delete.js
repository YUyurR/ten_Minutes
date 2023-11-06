import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function checkPsw(navigation, passwd) {
  const sendto = 'http://ceprj.gachon.ac.kr:60001/passwdAuth';
  let loginInfo = {passwd};

  AsyncStorage.getItem('accessToken').then(tokenReady => {
    fetch(sendto, {
      method: 'POST',
      headers: {
        Who: 'User',
        Authorization: tokenReady,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    })
      .then(async response => {
        const status = response.status;
        console.log(typeof status, status);
        if (status === 200) {
          console.log('비밀번호를 인증합니다...');
          navigation.navigate('Mypage', {screen: 'ConfirmDelete'});
        } else {
          throw new Error('Login failed');
        }
      })
      .catch(errors => {
        console.error(`${errors} - CheckPassword.js에서 에러 발생`);
      });
  });
}

function CheckPassword_delete() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!password) errors.password = '비밀번호를 입력하세요.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setPassword('');
      setErrors({});
      console.log('제출됨: ', password);
      checkPsw(navigation, password); // navigation을 인수로 전달
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <View style={styles.form}>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={password}
            placeholder="비밀번호 입력"
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            style={styles.buttons}
            title="확인"
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    color: '#707070',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  text: {
    color: '#2e2e2e',
  },
});

export default CheckPassword_delete;
