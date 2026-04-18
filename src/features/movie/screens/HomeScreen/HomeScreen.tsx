import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { usePreferencesStore } from '@/app/store/usePreferencesStore';
import { useMovies } from '@/features/movie/hooks/useMovies';
import { mapMovieDTO } from '@/features/movie/model/movie.mapper';

import { Dropdown } from '@/shared/components/Dropdown';
import { MovieCard } from '@/shared/components/MovieCard';
import { ErrorState } from '@/shared/components/ErrorState';
import { EmptyState } from '@/shared/components/EmptyState';
import { Category, SortOption } from '@/shared/types/api';

const CATEGORY_OPTIONS = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

const SORT_OPTIONS = [
  { label: 'By alphabetical order', value: 'alphabetical' },
  { label: 'By rating', value: 'rating' },
  { label: 'By release date', value: 'release_date' },
];

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, Screens } from '@/app/navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { category, setCategory, sortBy, setSortBy } = usePreferencesStore();
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies(category, activeQuery);

  const handleSearch = () => {
    setActiveQuery(searchInput.trim());
  };

  const movies = data?.pages.flatMap((page) => page.results.map(mapMovieDTO)) || [];

  // Apply sorting locally
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'rating') {
      return b.voteAverage - a.voteAverage;
    } else if (sortBy === 'release_date') {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
    return 0;
  });

  const headerElement = (
    <View style={styles.header}>
      <Image
        source={require('@/assets/images/Logo.png')}
        style={styles.logo}
        contentFit="contain"
      />

      <Dropdown
        label={CATEGORY_OPTIONS.find(o => o.value === category)?.label || 'Category'}
        options={CATEGORY_OPTIONS}
        selectedValue={category}
        onSelect={(val) => {
          setCategory(val as Category);
          setActiveQuery('');
          setSearchInput('');
        }}
      />

      <Dropdown
        label="Sort by"
        options={SORT_OPTIONS}
        selectedValue={sortBy || null}
        onSelect={(val) => setSortBy(val as SortOption)}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#999"
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.8}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {isLoading && movies.length === 0 ? (
        <View style={styles.centerFill}>
          {headerElement}
          <ActivityIndicator size="large" color="#0B253F" style={{ marginTop: 40 }} />
        </View>
      ) : isError && movies.length === 0 ? (
        <View style={styles.centerFill}>
          {headerElement}
          <ErrorState error={error} onRetry={refetch} />
        </View>
      ) : (
        <FlatList
          data={sortedMovies}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => navigation.navigate(Screens.DETAILS, { movieId: item.id })} />
          )}
          ListHeaderComponent={headerElement}
          contentContainerStyle={styles.listContent}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footerLoader} size="small" color="#0B253F" />
            ) : null
          }
          ListEmptyComponent={
            <EmptyState title="No movies found" subtitle="Try adjusting your search or category." />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 8,
  },
  logo: {
    width: 140,
    height: 60,
    alignSelf: 'center',
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#EAEAEA',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  centerFill: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  footerLoader: {
    marginVertical: 16,
  },
});
