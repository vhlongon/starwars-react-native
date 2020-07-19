import React from 'react';
import { View, Text } from 'react-native';

const FilmDetail = ({ route }) => {
  const {
    params: { id },
  } = route;
  return (
    <View>
      <Text>FilmDetail for id: {id}</Text>
    </View>
  );
};

export default FilmDetail;
