import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fishingLocations from '../../database/fishingLocations';

const BADGES: Record<string, {label: string; emoji: string}> = {
  spots: {label: 'Fishing', emoji: '🎣'},
  nature: {label: 'Scenic Nature', emoji: '🌿'},
  hidden: {label: 'Hidden Places', emoji: '💎'},
};

export default function WaterLedgerScreen() {
  const navigation = useNavigation<any>();

  const [places, setPlaces] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadPlaces();
    }, []),
  );

  async function loadPlaces() {
    const value = await AsyncStorage.getItem('saved_places');

    if (!value) {
      setPlaces([]);
      return;
    }

    const ids = JSON.parse(value);

    setPlaces(
      fishingLocations.filter(item => ids.includes(item.id)),
    );
  }

  async function remove(id: string) {
    const value = await AsyncStorage.getItem('saved_places');

    const ids = value ? JSON.parse(value) : [];

    const next = ids.filter((item: string) => item !== id);

    await AsyncStorage.setItem('saved_places', JSON.stringify(next));

    setPlaces(fishingLocations.filter(item => next.includes(item.id)));
  }

  const goExplore = () => navigation.navigate('HarborCompass');

  if (!places.length) {
    return (
      <View style={styles.container}>
        <Header count={0} />

        <View style={styles.empty}>
          <View style={styles.emptyCircle}>
            <Text style={styles.emptyEmoji}>🎣</Text>
          </View>

          <Text style={styles.emptyTitle}>No Saved Spots Yet!</Text>

          <Text style={styles.emptyText}>
            Start exploring and save your favorite fishing locations,
            scenic spots, and hidden gems!
          </Text>

          <View style={styles.emojiRow}>
            <Text style={styles.rowEmoji}>🎣</Text>
            <Text style={styles.rowEmoji}>🌊</Text>
            <Text style={styles.rowEmoji}>⚓</Text>
            <Text style={styles.rowEmoji}>🐟</Text>
            <Text style={styles.rowEmoji}>🌿</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.exploreBtn}
            onPress={goExplore}>
            <Text style={styles.exploreText}>🧭  Explore Locations</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Header count={places.length} />

            <Text style={styles.collectionLabel}>
              ◆ YOUR COLLECTION
            </Text>
          </>
        }
        ListFooterComponent={
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.moreBtn}
            onPress={goExplore}>
            <Text style={styles.moreText}>
              🧭  Explore More Locations
            </Text>
          </TouchableOpacity>
        }
        renderItem={({item}) => {
          const badge = BADGES[item.category] ?? BADGES.spots;

          return (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />

              <View style={styles.cardInfo}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => remove(item.id)}>
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.pill}>
                  <Text style={styles.pillText}>
                    {badge.emoji} {badge.label}
                  </Text>
                </View>

                <View style={styles.cardBottom}>
                  <Text style={styles.meta}>
                    ⭐ {item.rating}   📍 {item.distance}
                  </Text>

                  <TouchableOpacity
                    style={styles.openBtn}
                    onPress={() =>
                      navigation.navigate('PlaceView', {place: item})
                    }>
                    <Text style={styles.openText}>Open ›</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

function Header({count}: {count: number}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <Text style={styles.headerEmoji}>🔖</Text>
      </View>

      <View>
        <Text style={styles.headerTitle}>Saved Locations</Text>

        <Text style={styles.headerSub}>
          {count > 0
            ? `${count} spot${count === 1 ? '' : 's'} saved`
            : 'Your collection is empty'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  list: {
    paddingBottom: 130,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 8,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FF7A1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerEmoji: {
    fontSize: 22,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  headerSub: {
    marginTop: 2,
    color: '#9FB4D6',
    fontSize: 14,
  },

  collectionLabel: {
    marginTop: 22,
    marginBottom: 14,
    marginHorizontal: 20,
    color: '#8FA6CC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardImage: {
    width: 92,
    height: 92,
    borderRadius: 14,
  },

  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,80,80,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  removeText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '800',
  },

  pill: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  pillText: {
    color: '#C7D6F0',
    fontSize: 12,
    fontWeight: '700',
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  meta: {
    color: '#C7D6F0',
    fontSize: 13,
    fontWeight: '600',
  },

  openBtn: {
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D7CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  openText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  moreBtn: {
    marginHorizontal: 20,
    marginTop: 4,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreText: {
    color: '#C7D6F0',
    fontSize: 15,
    fontWeight: '700',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 34,
    paddingBottom: 80,
  },

  emptyCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(45,124,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(45,124,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    marginTop: 28,
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  emptyText: {
    marginTop: 14,
    color: '#9FB4D6',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  emojiRow: {
    flexDirection: 'row',
    marginTop: 24,
  },

  rowEmoji: {
    fontSize: 22,
    marginHorizontal: 8,
  },

  exploreBtn: {
    marginTop: 30,
    height: 58,
    paddingHorizontal: 34,
    borderRadius: 29,
    backgroundColor: '#FF7A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  exploreText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
