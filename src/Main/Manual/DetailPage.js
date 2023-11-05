import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';

function DetailPage({route}, {navigation}) {
  const {id, title, types, content} = route.params;
  return (
    <View style={styles.wholeblock}>
      <Text style={{fontSize: 25}}>
        # {JSON.stringify(route.params.params.id)}
      </Text>
      <Text style={styles.title}>대분류</Text>
      <Text style={styles.small_title}>
        {JSON.stringify(route.params.params.types).replace(/"|\?/g, '')}
      </Text>
      <Text style={styles.title}>아이템 이름(소분류)</Text>
      <Text style={styles.small_title}>
        {JSON.stringify(route.params.params.title).replace(/"|\?/g, '')}
      </Text>

      <Text style={styles.title}>처리 방법</Text>
      <Text style={styles.small_title}>
        {JSON.stringify(route.params.params.content).replace(/"|\?/g, '')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 15,
  },
  small_title: {
    fontSize: 15,
  },
  wholeblock: {
    padding: 20,
  },
});

export default DetailPage;
