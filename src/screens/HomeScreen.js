import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const HomeScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Type to search..." />
    </SafeAreaView>
  );
};

export default HomeScreen;
