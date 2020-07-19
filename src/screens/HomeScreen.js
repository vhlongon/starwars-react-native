import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useFetch, networkStatus } from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import FilmsList from '../components/FilmList';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const { data, error, status } = useFetch('https://star-wars-api.herokuapp.com/films');

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="type to search..." />
      {error && <Text>{`Something went wrong: ${JSON.stringify(error)}`}</Text>}
      {status === networkStatus.FETCHING && <LoadingSpinner />}
      {data && <FilmsList data={data} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
