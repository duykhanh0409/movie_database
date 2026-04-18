import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Screens, WatchlistStackParamList } from '@/app/navigation/types';
import { Movie } from '@/features/movie/model/movie';
import { useWatchlistPreferencesStore } from '@/features/watchlist/store/useWatchlistPreferencesStore';
import { useWatchlistStore } from '@/features/watchlist/store/useWatchlistStore';
import { SortOption } from '@/shared/types/api';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Rating', value: 'rating' },
  { label: 'Release Date', value: 'release_date' },
];

// Hardcoded user info as per spec
const USER_NAME = 'John Doe';
const USER_INITIAL = 'J';
const JOINED_DATE = 'August 2023';

export default function WatchlistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WatchlistStackParamList>>();
  const { items, removeMovie } = useWatchlistStore();
  const { sortBy, sortOrder, setSortBy, toggleSortOrder } = useWatchlistPreferencesStore();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const sortedMovies = useMemo(() => {
    const list = [...items];
    if (!sortBy) return list;
    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'alphabetical') {
        cmp = a.title.localeCompare(b.title);
      } else if (sortBy === 'rating') {
        cmp = a.voteAverage - b.voteAverage;
      } else if (sortBy === 'release_date') {
        cmp = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [items, sortBy, sortOrder]);

  const handleNavigateToDetail = useCallback(
    (movieId: number) => {
      navigation.navigate(Screens.DETAILS, { movieId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <WatchlistCard
        movie={item}
        onPress={() => handleNavigateToDetail(item.id)}
        onRemove={() => removeMovie(item.id)}
      />
    ),
    [handleNavigateToDetail, removeMovie]
  );

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Filter by';

  const listHeader = (
    <>
      {/* "My Watchlist" title + filter row */}
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listTitle}>My Watchlist</Text>

        {/* Inline filter row: "Filter by: [Rating ▼]   Order: ↑" */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Filter by:</Text>

          <TouchableOpacity
            style={styles.filterDropdownTrigger}
            onPress={() => setDropdownVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.filterSelectedText}>{currentSortLabel}</Text>
            <Ionicons name="chevron-down" size={14} color="#01B4E4" />
          </TouchableOpacity>

          <View style={styles.filterDivider} />

          <Text style={styles.filterLabel}>Order:</Text>
          <TouchableOpacity onPress={toggleSortOrder} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
              size={18}
              color="#0B253F"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.outerContainer}>
      {/* ── White logo bar (same as DetailScreen) ── */}
      <SafeAreaView edges={['top']} style={styles.logoSafeArea}>
        <View style={styles.logoHeader}>
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      </SafeAreaView>

      {/* ── Dark blue user profile band ── */}
      <View style={styles.profileBand}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.getParent()?.navigate('HomeTab')}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitial}>{USER_INITIAL}</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{USER_NAME}</Text>
          <Text style={styles.joinedDate}>Member since {JOINED_DATE}</Text>
        </View>
      </View>

      {/* ── Movie List (header contains title + filter row) ── */}
      <FlatList
        data={sortedMovies}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        contentContainerStyle={
          sortedMovies.length === 0 ? styles.emptyContent : styles.listContent
        }
        ListEmptyComponent={<WatchlistEmpty />}
        showsVerticalScrollIndicator={false}
        style={styles.listStyle}
      />

      {/* ── Sort Dropdown Modal ── */}
      <SortDropdown
        visible={dropdownVisible}
        selectedValue={sortBy}
        onSelect={(val) => {
          setSortBy(val);
          setDropdownVisible(false);
        }}
        onClose={() => setDropdownVisible(false)}
      />
    </View>
  );
}


interface WatchlistCardProps {
  movie: Movie;
  onPress: () => void;
  onRemove: () => void;
}

const WatchlistCard = React.memo(function WatchlistCard({
  movie,
  onPress,
  onRemove,
}: WatchlistCardProps) {
  const formattedDate = movie.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : '';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      {/* Poster */}
      <Image
        source={{ uri: movie.posterUrl ?? '' }}
        style={styles.poster}
        contentFit="cover"
        transition={200}
      />

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.cardDate}>{formattedDate}</Text>
        <Text style={styles.cardOverview} numberOfLines={4}>
          {movie.overview}
        </Text>
      </View>

      {/* Remove button — plain "×" matching design */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        activeOpacity={0.7}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

function WatchlistEmpty() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="bookmark-outline" size={64} color="#CCCCCC" />
      <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add movies from the Home screen to save them here.
      </Text>
    </View>
  );
}

interface SortDropdownProps {
  visible: boolean;
  selectedValue: string;
  onSelect: (value: SortOption) => void;
  onClose: () => void;
}

function SortDropdown({ visible, selectedValue, onSelect, onClose }: SortDropdownProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>Sort by</Text>
          {SORT_OPTIONS.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                onPress={() => onSelect(option.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    isSelected && styles.dropdownItemTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {isSelected && <Ionicons name="checkmark" size={18} color="#fff" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Logo bar (white, same as DetailScreen)
  logoSafeArea: {
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

  // Dark blue profile band
  profileBand: {
    backgroundColor: '#0B253F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 14,
  },
  backButton: {
    padding: 4,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  joinedDate: {
    color: '#ffffffaa',
    fontSize: 13,
  },

  // List
  listStyle: {
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },

  // List header (title + filter row)
  listHeaderContainer: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0B253F',
    marginBottom: 12,
  },

  // Inline filter row
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '400',
  },
  filterDropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderBottomWidth: 1.5,
    borderBottomColor: '#01B4E4',
    paddingBottom: 1,
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#01B4E4',
  },
  filterDivider: {
    width: 12,
  },

  // Watchlist Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'visible',
    marginBottom: 14,
    minHeight: 160,
  },
  poster: {
    width: 106,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#EAEAEA',
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    paddingRight: 30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B253F',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  cardOverview: {
    fontSize: 13,
    color: '#444',
    lineHeight: 19,
  },
  // Plain "×" remove button (top-right, matching design)
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
  },
  removeButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    lineHeight: 18,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B253F',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Sort Dropdown Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  dropdownContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  dropdownTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B253F',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#F7F7F7',
  },
  dropdownItemSelected: {
    backgroundColor: '#01B4E4',
  },
  dropdownItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0B253F',
  },
  dropdownItemTextSelected: {
    color: '#fff',
  },
});
