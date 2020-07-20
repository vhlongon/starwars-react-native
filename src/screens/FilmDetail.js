import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: { textAlign: 'center', color: '#333', marginTop: 10 },
  textContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#cacaca' },
  text: {
    fontSize: 16,
    color: '#6b6b6b',
    padding: 20,
  },
  director: { fontSize: 16, color: '#333', padding: 20 },
});

const FilmDetail = ({ route }) => {
  const {
    params: { title, opening_crawl, director },
  } = route;

  return (
    <View style={styles.container}>
      <Text style={styles.title} h4>
        {title}
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{opening_crawl}</Text>
      </View>
      <Text style={styles.director}>Directed by: {director}</Text>
    </View>
  );
};

export default FilmDetail;
