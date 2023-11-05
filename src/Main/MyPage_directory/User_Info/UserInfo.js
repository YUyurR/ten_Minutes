import React, {useState} from 'react';
import {
  ScrollView,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';

function UserInfo({navigation}) {
  const name = '홍길동';
  const date_birth = '19990418';
  let [nickname, setNickname] = useState('고슴도치');
  let [email, setEmail] = useState('hedgehogs@asdfg.com');
  const id = 'sea23';

  const [isReadOnly, setReadOnly] = useState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.signupform}>
        <Text style={styles.text}>이름</Text>
        <TextInput style={styles.input} value={name} editable={false} />

        <Text style={styles.text}>ID</Text>
        <TextInput
          style={styles.input}
          value={id}
          autoCapitalize="none"
          readOnly={true}
        />

        <Text style={styles.text}>생년월일</Text>
        <TextInput style={styles.input} value={date_birth} readOnly={true} />

        <Text style={styles.text}>닉네임</Text>
        <TextInput
          id="#nickname"
          width={'500'}
          style={styles.input}
          placeholderTextColor="#7a7a7a"
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
          autoCapitalize="none"
          flex={6}
          readOnly={isReadOnly}
        />

        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>이메일</Text>
          <TextInput
            id="#email"
            style={styles.input}
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            autoCapitalize="none"
            flex={6}
            readOnly={isReadOnly}
          />

          <View style={styles.buttons}>
            <Button
              title="수정하기"
              onPress={() => {
                navigation.navigate('Mypage', {screen: 'CheckPassword'});
              }}
            />
            <Button
              title="회원탈퇴"
              onPress={() => {
                navigation.navigate('DeleteAccount');
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
    borderColor: 'white',
  },
  input: {
    height: 38,
    color: '#595959',
    borderColor: 'white',
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

export default UserInfo;
