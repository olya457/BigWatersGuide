import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

const BADGES: Record<string, {label: string; emoji: string}> = {
  spots: {label: 'Fishing Spot', emoji: '🎣'},
  nature: {label: 'Scenic Nature', emoji: '🌿'},
  hidden: {label: 'Hidden Place', emoji: '💎'},
};

export default function PlaceViewScreen() {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const place = params.place;

  const badge = BADGES[place.category] ?? {
    label: 'Fishing Spot',
    emoji: '🎣',
  };

  const [saved, setSaved] = useState(false);

  useLayoutEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    const value = await AsyncStorage.getItem('saved_places');

    if (!value) {
      return;
    }

    const ids = JSON.parse(value);

    setSaved(ids.includes(place.id));
  }

  async function toggleSave() {
    const value = await AsyncStorage.getItem('saved_places');

    let ids = value ? JSON.parse(value) : [];

    if (ids.includes(place.id)) {
      ids = ids.filter((item: string) => item !== place.id);

      setSaved(false);
    } else {
      ids.push(place.id);

      setSaved(true);
    }

    await AsyncStorage.setItem('saved_places', JSON.stringify(ids));
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={place.image} style={styles.image} />

          <View style={styles.heroShade} />

          <TouchableOpacity
            style={styles.back}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.save, saved && styles.saveActive]}
            activeOpacity={0.85}
            onPress={toggleSave}>
            <Text style={styles.saveText}>
              🔖 {saved ? 'Saved!' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badge.emoji} {badge.label}
            </Text>
          </View>

          <Text style={styles.title}>{place.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>⭐ {place.rating}</Text>

            <Text style={styles.metaText}>
              📍 {place.distance} away
            </Text>
          </View>

          <Text style={styles.section}>ABOUT THIS PLACE</Text>

          <View style={styles.card}>
            <Text style={styles.description}>
              {place.description}
            </Text>
          </View>

          <Text style={styles.section}>DETAILS</Text>

          <View style={styles.card}>
            <DetailRow
              icon="🕐"
              label="BEST TIME"
              value={place.bestTime}
            />

            <View style={styles.divider} />

            <DetailRow
              icon="⚡"
              label="DIFFICULTY"
              value={place.difficulty}
            />

            <View style={styles.divider} />

            <DetailRow
              icon="📍"
              label="DISTANCE"
              value={place.distance}
            />
          </View>

          <Text style={styles.section}>LOCATION</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: place.latitude,
              longitude: place.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}>
            <Marker
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        <Text style={styles.detailEmoji}>{icon}</Text>
      </View>

      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>

        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  scroll: {
    paddingBottom: 130,
  },

  hero: {
    width: '100%',
    height: 320,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,27,63,0.28)',
  },

  back: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 56,
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(7,27,63,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: -3,
  },

  save: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 56,
    right: 20,
    height: 46,
    paddingHorizontal: 18,
    borderRadius: 23,
    backgroundColor: 'rgba(7,27,63,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveActive: {
    backgroundColor: '#FF7A1A',
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  body: {
    marginTop: -26,
    paddingHorizontal: 20,
    paddingTop: 8,
    backgroundColor: '#071B3F',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  badge: {
    alignSelf: 'flex-start',
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(45,124,255,0.18)',
  },

  badgeText: {
    color: '#7FB0FF',
    fontSize: 14,
    fontWeight: '700',
  },

  title: {
    marginTop: 14,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  metaText: {
    marginRight: 20,
    color: '#C7D6F0',
    fontSize: 16,
    fontWeight: '600',
  },

  section: {
    marginTop: 26,
    marginBottom: 12,
    color: '#8FA6CC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  card: {
    backgroundColor: '#0F2B50',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
  },

  description: {
    color: '#C7D6F0',
    fontSize: 16,
    lineHeight: 26,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },

  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(45,124,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailEmoji: {
    fontSize: 20,
  },

  detailText: {
    marginLeft: 14,
  },

  detailLabel: {
    color: '#8FA6CC',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  detailValue: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 12,
  },

  map: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
