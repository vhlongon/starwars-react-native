import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({ subtitle: { color: '#4a4a4a', fontSize: 12, marginTop: 5 } });

const FilmsList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => {
          const { fields: { title, opening_crawl, director } = {} } = data.find(
            ({ id }) => id === item.id,
          );
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FilmDetail', { title, opening_crawl, director });
              }}>
              <ListItem
                chevron
                title={item.fields.title}
                subtitle={
                  <View>
                    <Text style={styles.subtitle}>{item.fields.release_date}</Text>
                  </View>
                }
                bottomDivider
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FilmsList;
