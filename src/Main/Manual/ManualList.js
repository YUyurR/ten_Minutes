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
  Image,
} from 'react-native';
import filter from 'lodash.filter';
const URL = 'http://ceprj.gachon.ac.kr:60001/manual';

function ManualList() {
  //const [manualData, setManualData] = useState(null);

  // let response = fetch(URL)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     setManualData(JSON.stringify(json));
  //     //let str = JSON.stringify(json);
  //     //fetchData = JSON.stringify(json);
  //   });

  // console.log('>>>> manualData: ' + response + '   uwu');
  // console.log('response' + str);
  // console.log('response_manual_num (in fetch)??::' + response.manual_num); //잘 뜸. ok.
  // console.log('manual_num (in fetchData):' + fetchData.manual_num); //잘 뜸. ok.

  const [isloading, setIsLoading] = useState(false);
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

      setFullData(json);
      console.log(json);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredData = filter(fullData, trash => {
      return contains(trash, query);
    });
  };

  const contains = ({types, title}, query) => {
    if (types.includes(query) || title.includes(query)) {
      return true;
    } else return false;
  };

  if (error !== null) {
    return (
      <View>
        <Text>에러 발생. 나중에 시도해 주세요.</Text>
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

        <FlatList
          data={str}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <View style={styles.card}>
              {/* <Image /> */}
              <View>
                <Text style={styles.cardText}>{item.title}</Text>
                <Text style={'fontSize:18'}>{item.types}</Text>
              </View>
            </View>
          )}
        />
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
    marginBottom: 16,
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
});

export default ManualList;
