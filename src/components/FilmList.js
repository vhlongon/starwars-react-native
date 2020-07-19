import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({});

const FilmsList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={data.sort((a, b) => a.id - b.id)}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FilmDetail', { id: item.id });
            }}>
            <ListItem chevron title={item.fields.title} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilmsList;
