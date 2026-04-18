import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, Tabs } from './types';
import { HomeStack } from './stacks/HomeStack';
import { WatchlistStack } from './stacks/WatchlistStack';
import { IconSymbol } from '@/shared/components/ui/icon-symbol';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#0B253F',
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={Tabs.HOME_TAB}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tab.Screen
        name={Tabs.WATCHLIST_TAB}
        component={WatchlistStack}
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
