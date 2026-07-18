import React, {useMemo, useState} from 'react';
import {
  DimensionValue,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import fishingLocations from '../../database/fishingLocations';
import PlacePreview from './widgets/PlacePreview';

const CATS: Record<string, {color: string; emoji: string}> = {
  spots: {color: '#2D7CFF', emoji: '🎣'},
  nature: {color: '#17B39E', emoji: '🌿'},
  hidden: {color: '#8B5CF6', emoji: '💎'},
};

const FILTERS = [
  {id: 'all', label: 'All', emoji: '🗺️'},
  {id: 'spots', label: 'Fishing', emoji: '🎣'},
  {id: 'nature', label: 'Scenic', emoji: '🌿'},
  {id: 'hidden', label: 'Hidden', emoji: '💎'},
];

const lats = fishingLocations.map(l => l.latitude);
const lngs = fishingLocations.map(l => l.longitude);
const minLat = Math.min(...lats);
const maxLat = Math.max(...lats);
const minLng = Math.min(...lngs);
const maxLng = Math.max(...lngs);

function posFor(place: any) {
  const left = 8 + ((place.longitude - minLng) / (maxLng - minLng)) * 78;
  const top = 24 + ((maxLat - place.latitude) / (maxLat - minLat)) * 58;

  return {
    left: `${left}%` as DimensionValue,
    top: `${top}%` as DimensionValue,
  };
}

export default function HorizonChartScreen() {
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState<any>(null);

  const visible = useMemo(
    () =>
      fishingLocations.filter(
        l =>
          (cat === 'all' || l.category === cat) &&
          l.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, cat],
  );

  const showAll = () => {
    setCat('all');
    setQuery('');
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.land} />
      <View style={styles.water} />
      <View style={styles.lake} />

      {visible.map(place => {
        const meta = CATS[place.category] ?? CATS.spots;
        const active = selected?.id === place.id;

        return (
          <TouchableOpacity
            key={place.id}
            activeOpacity={0.9}
            onPress={() => setSelected(place)}
            style={[
              styles.pin,
              posFor(place),
              {
                backgroundColor: meta.color,
                borderColor: active ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                transform: [{scale: active ? 1.15 : 1}],
              },
            ]}>
            <Text style={styles.pinEmoji}>{meta.emoji}</Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.top}>
        <View style={styles.searchRow}>
          <View style={styles.search}>
            <Text style={styles.searchIcon}>🔍</Text>

            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="Search locations..."
              placeholderTextColor="#7C8AA6"
            />
          </View>

          <TouchableOpacity
            style={styles.showAll}
            activeOpacity={0.85}
            onPress={showAll}>
            <Text style={styles.showAllText}>Show All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map(f => {
            const on = cat === f.id;

            return (
              <TouchableOpacity
                key={f.id}
                activeOpacity={0.85}
                onPress={() => setCat(f.id)}
                style={[styles.pill, on && styles.pillOn]}>
                <Text style={styles.pillEmoji}>{f.emoji}</Text>

                <Text
                  style={[styles.pillText, on && styles.pillTextOn]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

      {selected && (
        <PlacePreview
          place={selected}
          onClose={() => setSelected(null)}
          onPress={() =>
            navigation.navigate('PlaceView', {place: selected})
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2530',
    overflow: 'hidden',
  },

  land: {
    position: 'absolute',
    top: -60,
    left: -60,
    right: -60,
    height: '66%',
    backgroundColor: '#1E4032',
    borderBottomLeftRadius: 260,
    borderBottomRightRadius: 200,
  },

  water: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '44%',
    backgroundColor: '#0C2A4A',
    borderTopLeftRadius: 180,
    borderTopRightRadius: 120,
  },

  lake: {
    position: 'absolute',
    left: 40,
    right: 120,
    bottom: 150,
    height: 90,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 60,
  },

  pin: {
    position: 'absolute',
    width: 46,
    height: 46,
    marginLeft: -23,
    marginTop: -23,
    borderRadius: 23,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },

  pinEmoji: {
    fontSize: 20,
  },

  top: {
    paddingTop: 58,
    paddingHorizontal: 16,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(7,27,63,0.72)',
    paddingHorizontal: 16,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    padding: 0,
  },

  showAll: {
    marginLeft: 10,
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(7,27,63,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  showAllText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  filterRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginRight: 8,
    backgroundColor: 'rgba(7,27,63,0.72)',
  },

  pillOn: {
    backgroundColor: '#FF7A1A',
  },

  pillEmoji: {
    fontSize: 14,
    marginRight: 6,
  },

  pillText: {
    color: '#C7D6F0',
    fontSize: 13,
    fontWeight: '700',
  },

  pillTextOn: {
    color: '#FFFFFF',
  },
});
