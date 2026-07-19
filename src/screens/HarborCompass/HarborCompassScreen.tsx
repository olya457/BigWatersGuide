import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import fishingLocations from '../../database/fishingLocations';

import CategoryStrip from './widgets/CategoryStrip';
import CategoryCards from './widgets/CategoryCards';
import SpotCard from './widgets/SpotCard';

const CATEGORIES = [
  {id: 'spots', title: 'Fishing Spots', emoji: '🎣', color: '#2D7CFF'},
  {id: 'nature', title: 'Scenic Nature', emoji: '🏞️', color: '#12B3A6'},
  {id: 'hidden', title: 'Hidden Places', emoji: '💎', color: '#8B5CF6'},
];

const BADGES: Record<string, {label: string; color: string}> = {
  spots: {label: 'Fishing', color: '#2D7CFF'},
  nature: {label: 'Nature', color: '#12B3A6'},
  hidden: {label: 'Hidden', color: '#8B5CF6'},
};

export default function HarborCompassScreen() {
  const navigation = useNavigation<any>();

  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () =>
      CATEGORIES.map(item => ({
        ...item,
        count: fishingLocations.filter(
          place => place.category === item.id,
        ).length,
      })),
    [],
  );

  const data = useMemo(() => {
    const list =
      category === 'all'
        ? fishingLocations
        : fishingLocations.filter(
            item => item.category === category,
          );

    return [...list]
      .filter(item =>
        item.title.toLowerCase().includes(query.trim().toLowerCase()),
      )
      .sort((a, b) => b.rating - a.rating);
  }, [category, query]);

  const sectionTitle =
    category === 'all'
      ? '⭐ Top rated'
      : CATEGORIES.find(c => c.id === category)?.title ?? '';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.brand}>BIG WATERS · FIELD ATLAS</Text>

        <View style={styles.headerRow}>
          <Text style={styles.title}>Read the water{'\n'}before you go.</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.mapButton}
            onPress={() => navigation.navigate('HorizonChart')}>
            <Text style={styles.mapButtonIcon}>⌖</Text>
            <Text style={styles.mapButtonText}>Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.search}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Find a water by name"
            placeholderTextColor="#7186AA"
            style={styles.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearSearch}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CategoryStrip value={category} onChange={setCategory} />

      <Text style={styles.sectionLabel}>BROWSE BY CHARACTER</Text>

      <CategoryCards
        categories={categories}
        onSelect={setCategory}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.banner}
        onPress={() => setCategory('all')}>
          <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Complete water index</Text>

          <Text style={styles.bannerSub}>
            {fishingLocations.length} total
          </Text>
        </View>

        <Text style={styles.bannerArrow}>›</Text>
      </TouchableOpacity>

      <Text style={styles.sectionLabel}>{sectionTitle}</Text>

      {data.length === 0 && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsTitle}>No matching water</Text>
          <Text style={styles.noResultsText}>Try another name or clear the filters.</Text>
        </View>
      )}

      {data.map(item => (
        <SpotCard
          key={item.id}
          image={item.image}
          title={item.title}
          subtitle={item.description}
          rating={item.rating}
          distance={item.distance}
          badge={BADGES[item.category]?.label}
          badgeColor={BADGES[item.category]?.color}
          onPress={() =>
            navigation.navigate('PlaceView', {place: item})
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  content: {
    paddingTop: 64,
    paddingBottom: 130,
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  brand: {
    color: '#FF8A3D',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  headerRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
  },

  mapButton: {
    minWidth: 72,
    height: 48,
    marginTop: 3,
    paddingHorizontal: 13,
    borderRadius: 18,
    backgroundColor: '#2D7CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapButtonIcon: {
    marginRight: 5,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  search: {
    marginTop: 20,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#0F2B50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  searchIcon: {
    color: '#7FB0FF',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  searchInput: {flex: 1, padding: 0, color: '#FFFFFF', fontSize: 15},
  clearSearch: {color: '#9FB4D6', fontSize: 25},

  sectionLabel: {
    marginTop: 26,
    marginBottom: 14,
    marginHorizontal: 20,
    color: '#8FA6CC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  banner: {
    marginTop: 22,
    marginHorizontal: 20,
    height: 74,
    borderRadius: 22,
    backgroundColor: '#FF7A1A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  bannerIcon: {
    fontSize: 26,
  },

  bannerText: {
    flex: 1,
    marginLeft: 14,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  bannerSub: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },

  bannerArrow: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  noResults: {marginHorizontal: 20, padding: 24, borderRadius: 22, backgroundColor: '#0F2B50'},
  noResultsTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  noResultsText: {marginTop: 6, color: '#8FA6CC', fontSize: 14},
});
