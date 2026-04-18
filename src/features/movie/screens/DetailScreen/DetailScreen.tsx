import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMovieDetails } from '@/features/movie/hooks/useMovieDetails';
import { useMovieCredits } from '@/features/movie/hooks/useMovieCredits';
import { ErrorState } from '@/shared/components/ErrorState';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { formatRuntime } from '@/shared/utils/formatRuntime';
import { ScoreIndicator } from '@/shared/components/ScoreIndicator';
import { CastCarousel } from '@/features/movie/components/CastCarousel';
import { useWatchlistStore } from '@/features/watchlist/store/useWatchlistStore';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList, Screens } from '@/app/navigation/types';

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, typeof Screens.DETAILS>>();
  const movieId = route.params.movieId;

  const { data: movie, isLoading: isLoadingDetails, error: detailsError, refetch: refetchDetails } = useMovieDetails(movieId);
  const { data: credits, isLoading: isLoadingCredits, error: creditsError, refetch: refetchCredits } = useMovieCredits(movieId);

  const { isInWatchlist, addMovie, removeMovie } = useWatchlistStore();
  const isWatchlisted = isInWatchlist(movieId);

  const handleWatchlistToggle = () => {
    if (!movie) return;
    if (isWatchlisted) {
      removeMovie(movie.id);
    } else {
      // Need to construct a Movie object from MovieDetails
      addMovie({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        backdropUrl: movie.backdropUrl,
        releaseDate: movie.releaseDate,
        overview: movie.overview,
        voteAverage: movie.voteAverage,
      });
    }
  };

  if (isLoadingDetails || isLoadingCredits) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#01b4e4" />
      </View>
    );
  }

  if (detailsError || creditsError) {
    return (
      <ErrorState 
        error={detailsError as Error || creditsError as Error} 
        onRetry={() => {
          refetchDetails();
          refetchCredits();
        }} 
      />
    );
  }

  if (!movie) return null;

  const year = movie.releaseDate ? movie.releaseDate.split('-')[0] : '';
  const director = credits?.crew.find((c) => c.job === 'Director');
  const writers = credits?.crew.filter((c) => c.department === 'Writing').slice(0, 2);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <View style={styles.logoHeader}>
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.headerBackground}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText} numberOfLines={1}>
                {movie.title} <Text style={styles.yearText}>({year})</Text>
              </Text>
            </View>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.topInfo}>
          <Image 
            source={{ uri: movie.posterUrl || 'https://via.placeholder.com/300x450' }} 
            style={styles.poster}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.metaData}>
            {movie.rating && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{movie.rating}</Text>
              </View>
            )}
            <Text style={styles.metaText}>
              {movie.releaseDate} • {formatRuntime(movie.runtime)}
            </Text>
            <Text style={styles.metaText}>{movie.genres.map(g => g.name).join(', ')}</Text>
            <Text style={styles.metaText}><Text style={styles.boldText}>Status:</Text> {movie.status}</Text>
            <Text style={styles.metaText}><Text style={styles.boldText}>Original Language:</Text> {movie.originalLanguage === 'en' ? 'English' : movie.originalLanguage}</Text>
          </View>
        </View>

        <View style={styles.midInfo}>
          <View style={styles.scoreRow}>
            <ScoreIndicator score={movie.voteAverage} size={60} />
            <Text style={styles.scoreLabel}>User Score</Text>
          </View>
          
          <View style={styles.crewGrid}>
            {director && (
              <View style={styles.crewItem}>
                <Text style={styles.crewName}>{director.name}</Text>
                <Text style={styles.crewJob}>{director.job}</Text>
              </View>
            )}
            {writers?.map(writer => (
              <View style={styles.crewItem} key={`${writer.id}-${writer.job}`}>
                <Text style={styles.crewName}>{writer.name}</Text>
                <Text style={styles.crewJob}>{writer.job}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomInfo}>
          {movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : null}
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
          
          <TouchableOpacity 
            style={styles.watchlistButton} 
            onPress={handleWatchlistToggle}
          >
            <Ionicons name="bookmark" size={20} color="#fff" style={styles.watchlistIcon} />
            <Text style={styles.watchlistButtonText}>
              {isWatchlisted ? 'Remove from Watchlist' : 'Add To Watchlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.castSection}>
        {credits?.cast && <CastCarousel cast={credits.cast} />}
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSafeArea: {
    backgroundColor: '#fff',
  },
  logoHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logo: {
    width: 120,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackground: {
    backgroundColor: '#01b4e4',
    paddingBottom: 24,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    width: 44,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yearText: {
    fontWeight: 'normal',
    color: '#ffffffcc',
  },
  topInfo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  metaData: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingBadge: {
    borderWidth: 1,
    borderColor: '#ffffff80',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
  },
  metaText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  midInfo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  scoreLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  crewGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  crewItem: {
    width: '45%',
  },
  crewName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  crewJob: {
    color: '#fff',
    fontSize: 12,
  },
  bottomInfo: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  tagline: {
    color: '#ffffffcc',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 12,
  },
  overviewTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  overviewText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  watchlistIcon: {
    marginRight: 8,
  },
  watchlistButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  castSection: {
    backgroundColor: '#fff',
  },
});
