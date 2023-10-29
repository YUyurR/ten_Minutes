import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Keyboard,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {SignupRequest} from './SignupRequest.js';
import UserNNicknameTest from './ValidateFormat.js';

function SignUpPage({navigation}) {
  let signupForm = {
    name: null,
    birthdate: null,
    nickname: null,
    email: null,
    id: null,
    password: null,
    //SubmitPwConfirm: null,
  };

  const [signedUp, setSignup] = useState(false); //회원가입 성공 여부를 지정하는 곳. 그다음 취할 액션에 영향을 줌.
  const [username, setName] = useState('');
  const [date_birth, setBday] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setConfirm] = useState('');
  const [errmsg, setErrors] = useState({name: ''});

  const handleSubmit = () => {
    //if (validateForm()) {
    signupForm.name = username;
    signupForm.birthdate = date_birth;
    signupForm.nickname = nickname;
    signupForm.email = email;
    signupForm.id = id;
    signupForm.password = password;
    //signupForm.SubmitPwConfirm = pwConfirm;

    let signup = SignupRequest({signupForm});
    {
      signup;
    }
    console.log('회원가입page로 리턴한 값: ' + JSON.stringify({signup}));

    //SignupRequest에서 받은 값에 따라 setSignup(true) 또는 (false) 로 처리할지 정할 것.
    // }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.signupform}>
          <KeyboardAvoidingView behavior="position">
            {errmsg.name == '' ? (
              <Text style={styles.errorText}>{errmsg.name}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="이름"
              value={username}
              onChangeText={setName}
              onBlur={() => {
                let isUsernameValid = UserNNicknameTest(username); // Assuming UserNNicknameTest is a function that checks the username.
                setErrors({
                  ...errmsg,
                  name: isUsernameValid ? '' : '틀렸어 십~',
                });
                console.log(username);
                console.log(errmsg.name);
              }}
            />

            {errmsg.date_birth ? (
              <Text style={styles.errorText}>{errmsg.date_birth}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="생년월일(yyyymmdd)"
              value={date_birth}
              keyboardType="numeric"
              onChangeText={setBday}
              maxLength={8}
            />

            {errmsg.nickname ? (
              <Text style={styles.errorText}>{errmsg.nickname}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="닉네임"
              value={nickname}
              onChangeText={setNickname}
            />

            {errmsg.email ? (
              <Text style={styles.errorText}>{errmsg.email}</Text>
            ) : null}

            <View style={styles.wrapper}></View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="이메일"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            {errmsg.id ? (
              <Text style={styles.errorText}>{errmsg.id}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="ID 입력"
              maxLength={8}
              value={id}
              onChangeText={setID}
              autoCapitalize="none"
            />

            {errmsg.password ? (
              <Text style={styles.errorText}>{errmsg.password}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="PW(영문+숫자+특수문자 포함 8~16자)"
              value={password}
              maxLength={16}
              secureTextEntry
              onChangeText={setPassword}
              autoCapitalize="none"
            />

            {errmsg.pwConfirm ? (
              <Text style={styles.errorText}>{errmsg.pwConfirm}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="PW 확인"
              value={pwConfirm}
              maxLength={16}
              secureTextEntry
              onChangeText={setConfirm}
              autoCapitalize="none"
            />

            <Button
              title="가입완료"
              onPress={() => {
                handleSubmit();
                if (signedUp == true) {
                  navigation.navigate('MainPage');
                }
                //if (signedUp == false)면 폼 비우고 다시 쓰라고 안내하기
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  signupform: {
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
    flexDirection: 'row',
    height: 40,
    color: '#595959',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  wrapper: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignUpPage;
