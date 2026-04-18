import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  Details: { movieId: number };
};

export type WatchlistStackParamList = {
  Watchlist: undefined;
  Details: { movieId: number };
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  WatchlistTab: NavigatorScreenParams<WatchlistStackParamList>;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList>;
};

export const Screens = {
  HOME: 'Home' as const,
  DETAILS: 'Details' as const,
  WATCHLIST: 'Watchlist' as const,
};

export const Tabs = {
  HOME_TAB: 'HomeTab' as const,
  WATCHLIST_TAB: 'WatchlistTab' as const,
};
