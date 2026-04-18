import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Movie } from '@/features/movie/model/movie';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export function MovieCard({ movie, onPress }: MovieCardProps) {
  const formattedDate = movie.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: movie.posterUrl || '' }}
        style={styles.poster}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    overflow: 'hidden',
    marginBottom: 16,
    height: 160,
  },
  poster: {
    width: 106,
    height: '100%',
    backgroundColor: '#EAEAEA',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
