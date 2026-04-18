import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WatchlistScreen from '@/features/watchlist/screens/WatchlistScreen/WatchlistScreen';
import DetailScreen from '@/features/movie/screens/DetailScreen/DetailScreen';
import { WatchlistStackParamList, Screens } from '../types';

const Stack = createNativeStackNavigator<WatchlistStackParamList>();

export function WatchlistStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.WATCHLIST} component={WatchlistScreen} />
      <Stack.Screen name={Screens.DETAILS} component={DetailScreen} />
    </Stack.Navigator>
  );
}
