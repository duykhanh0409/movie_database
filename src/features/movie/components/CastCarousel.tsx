import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Cast } from '@/features/movie/model/credits';
import { Image } from 'expo-image';

interface CastCarouselProps {
  cast: Cast[];
}

export function CastCarousel({ cast }: CastCarouselProps) {
  const renderItem: ListRenderItem<Cast> = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.profileUrl || 'https://via.placeholder.com/150x225?text=No+Image' }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.character} numberOfLines={2}>{item.character}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Billed Cast</Text>
      <FlatList
        data={cast.slice(0, 20)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 120,
    height: 180,
  },
  info: {
    padding: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  character: {
    fontSize: 12,
    color: '#666',
  },
});
