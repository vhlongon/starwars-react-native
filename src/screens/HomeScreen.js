import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useFetch, networkStatus } from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import FilmsList from '../components/FilmList';
import { Dropdown } from 'react-native-material-dropdown-v2';

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { flexDirection: 'row' },
  searchBar: {
    flexBasis: '80%',
  },
  filter: {
    flexBasis: '20%',
    backgroundColor: 'rgb(181, 187, 193)',
  },
  picker: {
    borderWidth: 2,
    borderColor: 'green',
  },
});

const orderByReleaseDate = data =>
  data.sort(
    (a, b) => new Date(a.fields.release_date).getTime() - new Date(b.fields.release_date).getTime(),
  );

const orderByEpisode = data => data.sort((a, b) => a.fields.episode_id - b.fields.episode_id);

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const { data, error, status } = useFetch('https://star-wars-api.herokuapp.com/films');
  const [sortedData, setSortedData] = useState(null);

  const handleSort = text => {
    const newData = text === 'year' ? orderByReleaseDate(data) : orderByEpisode(data);
    setSort(text);
    setSortedData(newData);
  };
  const handleFilter = text => {
    const newData = text
      ? (sortedData || data).filter(({ fields: { title } }) =>
          title.toLowerCase().includes(text.toLowerCase()),
        )
      : data;

    setSearch(text);
    setSortedData(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Dropdown
          baseColor="white"
          fontSize={14}
          itemPadding={6}
          value={sort}
          onChangeText={handleSort}
          containerStyle={styles.filter}
          label="Sort by"
          data={[{ value: 'year' }, { value: 'episode' }]}
        />
        <SearchBar
          containerStyle={styles.searchBar}
          value={search}
          onChangeText={handleFilter}
          placeholder="type to search..."
        />
      </View>
      {error && <Text>{`Something went wrong: ${JSON.stringify(error)}`}</Text>}
      {status === networkStatus.FETCHING && <LoadingSpinner />}
      {data && <FilmsList data={sortedData || data} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
