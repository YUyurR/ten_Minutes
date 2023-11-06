import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditInfo({navigation}) {
  const [username, setName] = useState(''); //readonly. 형식상 남겨둠
  const [date_birth, setBday] = useState(''); //readonly. 형식상 남겨둠
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [id, setID] = useState(''); //readonly. 형식상 남겨둠
  const [psw, setPSW] = useState('');
  const [pswChk, setpswChk] = useState('');

  const changeReq = {id: id, nickname: nickname, email: email, password: psw};

  async function UserInfoReq() {
    let myToken = await AsyncStorage.getItem('accessToken');
    const sendto = 'http://ceprj.gachon.ac.kr:60001/myinfo';
    const options = {
      method: 'GET',
      headers: {
        Who: 'User',
        'Content-Type': 'application/json',
        Authorization: myToken,
      },
    };

    return fetch(sendto, options)
      .then(async response => {
        console.log('response 있음');
        const responseObject = await response.json();
        const status = response.status;
        console.log(
          `[response 형식: ${typeof responseObject}, ${JSON.stringify(
            responseObject,
          )}, ${status}]`,
        );
        const isoDate = responseObject.birth;
        const date = new Date(isoDate);
        //Date formating
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setName(responseObject.name);
        setID(responseObject.id);
        setBday(formattedDate);
        setNickname(responseObject.nickname);
        setEmail(responseObject.email);
      })
      .catch(errors => {
        console.error(`${errors} - UserInfo.js에서 에러 발생`);
      });
  }

  async function ChangeInfoReq(changeReq) {
    let myToken = await AsyncStorage.getItem('accessToken');
    const sendto = 'http://ceprj.gachon.ac.kr:60001/myinfo';
    const options = {
      method: 'PATCH',
      headers: {
        Who: 'User',
        'Content-Type': 'application/json',
        Authorization: myToken,
      },
      body: JSON.stringify(changeReq),
    };
    console.log('before fetch');
    return fetch(sendto, options)
      .then(response => {
        console.log('in fetch');
        const responseString = JSON.stringify({response}); //내용 및 상태 확인
        const responseObject = JSON.parse(responseString);
        const status = responseObject.response.status;
        console.log(status);
        console.log(
          'response 형식: ' +
            typeof {response} +
            '\n' +
            JSON.stringify({response}) +
            '\n' +
            status +
            ']',
        );
        if (status === 200) {
          toLogin = true;
          console.log('response  (in IF절): ' + response);
          console.log('response.status (in IF절): ' + response.status);
          console.log('data--성공: ' + response.ok);
        } else {
          console.log('수정사항 저장 실패');
        }
      })
      .catch(error => {
        console.error(`${error}-SignupRequest.js에서 오류 발생`);
      });
  }

  UserInfoReq();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.signupform}>
        <Text style={styles.text}>이름</Text>
        <TextInput style={styles.input} value={username} readOnly={true} />

        <Text style={styles.text}>ID</Text>
        <TextInput style={styles.input} value={id} readOnly={true} />

        <Text style={styles.text}>생년월일</Text>
        <TextInput style={styles.input} value={date_birth} readOnly={true} />

        <Text style={styles.text}>닉네임</Text>
        <TextInput
          id="#nickname"
          width={'500'}
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          flex={6}
        />

        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>이메일</Text>
          <TextInput
            id="#email"
            style={styles.input}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            flex={6}
          />
          <Text style={styles.text}>비밀번호</Text>
          <TextInput
            style={styles.input}
            value={psw}
            onChangeText={setPSW}
            secureTextEntry
            autoCapitalize="none"
            flex={6}
          />
          <Text style={styles.text}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            value={pswChk}
            onChangeText={setpswChk}
            secureTextEntry
            autoCapitalize="none"
            flex={6}
          />
          <View style={styles.buttons}>
            <Button
              title="저장하기"
              onPress={() => {
                ChangeInfoReq({changeReq});
              }}
            />
          </View>
        </KeyboardAvoidingView>
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
    marginTop: 30,
    marginBottom: 30,
    Width: '100%',
  },
  text: {
    color: '#2e2e2e',
    borderColor: '#ccc',
  },
  input: {
    height: 38,
    color: '#595959',
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 4,
    marginBottom: 18,
    padding: 10,
    borderRadius: 5,
  },
  buttons: {
    marginTop: 10,
    justifyContent: 'center',
  },
  editButton: {
    width: 60,
    padding: 0,
  },
});

export default EditInfo;
