import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/features/movie/screens/HomeScreen/HomeScreen';
import DetailScreen from '@/features/movie/screens/DetailScreen/DetailScreen';
import { HomeStackParamList, Screens } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={HomeScreen} />
      <Stack.Screen name={Screens.DETAILS} component={DetailScreen} />
    </Stack.Navigator>
  );
}
