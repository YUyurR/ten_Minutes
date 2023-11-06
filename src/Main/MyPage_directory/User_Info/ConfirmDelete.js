import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';

function ConfirmDelete() {
  return (
    <View>
      <Text>회원탈퇴가 완료되었습니다.😔</Text>
      <Button title="확인"></Button>
    </View>
  );
}

export default ConfirmDelete;
