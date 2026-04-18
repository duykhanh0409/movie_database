import { IconSymbol } from '@/shared/components/ui/icon-symbol';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { HomeStack } from './stacks/HomeStack';
import { WatchlistStack } from './stacks/WatchlistStack';
import { BottomTabParamList, Screens, Tabs } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function makeResetOnTabPress(rootScreenName: string) {
  return ({ navigation, route }: { navigation: NavigationProp<BottomTabParamList>; route: any }) => ({
    tabPress: (e: any) => {
      const tabRoute = navigation.getState().routes.find((r) => r.name === route.name);
      const nestedIndex = tabRoute?.state?.index ?? 0;

      if (nestedIndex > 0) {
        e.preventDefault();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: route.name,
                state: { index: 0, routes: [{ name: rootScreenName }] },
              },
            ],
          })
        );
      }
    },
  });
}

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: { backgroundColor: '#0B253F', borderTopWidth: 0 },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={Tabs.HOME_TAB}
        component={HomeStack}
        options={{ tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} /> }}
        listeners={makeResetOnTabPress(Screens.HOME)}
      />
      <Tab.Screen
        name={Tabs.WATCHLIST_TAB}
        component={WatchlistStack}
        options={{ tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} /> }}
        listeners={makeResetOnTabPress(Screens.WATCHLIST)}
      />
    </Tab.Navigator>
  );
}
