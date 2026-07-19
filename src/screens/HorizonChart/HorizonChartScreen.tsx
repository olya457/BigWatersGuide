import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import fishingLocations from '../../database/fishingLocations';
import {RiverLocation} from '../../types/location';
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

const INITIAL_REGION = {
  latitude: 46.497,
  longitude: 30.762,
  latitudeDelta: 0.12,
  longitudeDelta: 0.14,
};

const DARK_MAP_STYLE = [
  {elementType: 'geometry', stylers: [{color: '#18394a'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#b9cbd1'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#142f3d'}]},
  {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{color: '#41606b'}]},
  {featureType: 'landscape', elementType: 'geometry', stylers: [{color: '#254c40'}]},
  {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#285342'}]},
  {featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#9ec2a7'}]},
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#385765'}]},
  {featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#1d3b47'}]},
  {featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#c5d3d7'}]},
  {featureType: 'transit', elementType: 'geometry', stylers: [{color: '#315260'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: '#0b294a'}]},
  {featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#7fa8bc'}]},
];

export default function HorizonChartScreen() {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState<RiverLocation | null>(null);

  const visible = useMemo(
    () =>
      fishingLocations.filter(
        location =>
          (cat === 'all' || location.category === cat) &&
          location.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, cat],
  );

  useEffect(() => {
    if (!visible.length) {
      return;
    }

    const timer = setTimeout(() => {
      if (visible.length === 1) {
        mapRef.current?.animateToRegion(
          {
            latitude: visible[0].latitude,
            longitude: visible[0].longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          },
          400,
        );
        return;
      }

      mapRef.current?.fitToCoordinates(
        visible.map(({latitude, longitude}) => ({latitude, longitude})),
        {
          animated: true,
          edgePadding: {top: 170, right: 50, bottom: 180, left: 50},
        },
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [visible]);

  const showAll = () => {
    setCat('all');
    setQuery('');
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={INITIAL_REGION}
        customMapStyle={DARK_MAP_STYLE}
        showsCompass
        showsScale
        rotateEnabled
        pitchEnabled
        toolbarEnabled={false}
        onPress={() => setSelected(null)}>
        {visible.map(place => {
          const meta = CATS[place.category] ?? CATS.spots;
          const active = selected?.id === place.id;

          return (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.title}
              description={`${place.rating} ★ · ${place.distance}`}
              tracksViewChanges={active}
              onPress={event => {
                event.stopPropagation();
                setSelected(place);
              }}>
              <View
                style={[
                  styles.pin,
                  {backgroundColor: meta.color},
                  active && styles.pinActive,
                ]}>
                <Text style={styles.pinEmoji}>{meta.emoji}</Text>
              </View>
              <View style={[styles.pinTip, {borderTopColor: meta.color}]} />
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.top} pointerEvents="box-none">
        <View style={styles.searchRow}>
          <TouchableOpacity
            accessibilityLabel="Back"
            style={styles.back}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.search}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="Search locations..."
              placeholderTextColor="#9BAAC3"
            />
          </View>

          <TouchableOpacity
            style={styles.showAll}
            activeOpacity={0.85}
            onPress={showAll}>
            <Text style={styles.showAllText}>All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map(filter => {
            const on = cat === filter.id;

            return (
              <TouchableOpacity
                key={filter.id}
                activeOpacity={0.85}
                onPress={() => {
                  setCat(filter.id);
                  setSelected(null);
                }}
                style={[styles.pill, on && styles.pillOn]}>
                <Text style={styles.pillEmoji}>{filter.emoji}</Text>
                <Text style={[styles.pillText, on && styles.pillTextOn]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {!visible.length && (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No places found</Text>
          <TouchableOpacity onPress={showAll}>
            <Text style={styles.emptyAction}>Clear search</Text>
          </TouchableOpacity>
        </View>
      )}

      {selected && (
        <PlacePreview
          place={selected}
          onClose={() => setSelected(null)}
          onPress={() => navigation.navigate('PlaceView', {place: selected})}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0A2530', overflow: 'hidden'},
  top: {paddingTop: Platform.OS === 'ios' ? 58 : 30, paddingHorizontal: 14},
  searchRow: {flexDirection: 'row', alignItems: 'center'},
  back: {
    width: 46,
    height: 48,
    marginRight: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(7,27,63,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {marginTop: -4, color: '#FFFFFF', fontSize: 38, fontWeight: '300'},
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(7,27,63,0.9)',
    paddingHorizontal: 15,
  },
  searchIcon: {fontSize: 16, marginRight: 8},
  input: {flex: 1, color: '#FFFFFF', fontSize: 15, padding: 0},
  showAll: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(7,27,63,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showAllText: {color: '#FFFFFF', fontSize: 14, fontWeight: '800'},
  filterRow: {flexDirection: 'row', marginTop: 12},
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginRight: 7,
    backgroundColor: 'rgba(7,27,63,0.9)',
  },
  pillOn: {backgroundColor: '#FF7A1A'},
  pillEmoji: {fontSize: 13, marginRight: 5},
  pillText: {color: '#C7D6F0', fontSize: 12, fontWeight: '700'},
  pillTextOn: {color: '#FFFFFF'},
  pin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 7,
    shadowOffset: {width: 0, height: 4},
    elevation: 7,
  },
  pinActive: {width: 50, height: 50, borderRadius: 25},
  pinEmoji: {fontSize: 19},
  pinTip: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  empty: {
    position: 'absolute',
    top: '43%',
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 18,
    backgroundColor: 'rgba(7,27,63,0.94)',
    alignItems: 'center',
  },
  emptyTitle: {color: '#FFFFFF', fontSize: 16, fontWeight: '800'},
  emptyAction: {marginTop: 7, color: '#7FB0FF', fontSize: 14, fontWeight: '700'},
});
