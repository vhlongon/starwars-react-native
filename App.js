import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FilmDetail from './src/screens/FilmDetail';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ title: 'Star wars' }} component={HomeScreen} />
      <Stack.Screen name="FilmDetail" options={{ title: 'Film details' }} component={FilmDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
