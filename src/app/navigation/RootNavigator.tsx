import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTabs';
import { RootStackParamList } from './types';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
