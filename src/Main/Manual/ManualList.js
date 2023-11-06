import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import filter from 'lodash.filter';
const URL = 'http://ceprj.gachon.ac.kr:60001/manualList';

function ManualList({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [str, setStr] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchData(URL);
  }, []);

  const fetchData = async URL => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setStr(json);
      console.log(json);

      setFullData(json);
      //console.log(json);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  const contains = ({types, title}, query) => {
    if (types.includes(query) || title.includes(query)) {
      return true;
    } else return false;
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredData = filter(fullData, item => {
      return contains(item, query);
    });
    setStr(filteredData);
  };

  if (error !== null) {
    return (
      <View>
        <Text>에러 발생. 나중에 시도해 주세요.</Text>
      </View>
    );
  }

  if (isLoading === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    //검색창 만들기
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <TextInput
          placeholder="검색"
          clearButtonMode="always"
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={query => handleSearch(query)}
        />
        <View style={{height: '87%'}}>
          <FlatList
            data={str}
            keyExtractor={item => item.manual_num}
            renderItem={({item}) => (
              //<View style={styles.opacityWrapper}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#AFE1AF')}
                onPress={() =>
                  navigation.push('DetailPage', {
                    screen: 'ManualList',
                    params: {
                      id: item.manual_num,
                      title: item.title,
                      types: item.types,
                      content: item.content,
                    },
                  })
                }>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardText}>{item.title}</Text>
                    <Text style={'fontSize:18'}>{item.types}</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
              //</View>
            )}
            ItemSeparatorComponent={<View style={{height: 16}} />}
            ListEmptyComponent={
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderColor: '#888',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    //marginBottom: 16,
  },
  cardText: {
    fontSize: 20,
  },
  searchBox: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: '#888',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    //flex: 1,
    //marginHorizontal: 20,
  },
  empty: {
    justifyContent: 'center',
  },
  opacityWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
    rippleColor: '#FF5733',
  },
});

export default ManualList;
