import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fishingLocations from '../../database/fishingLocations';
import fishingFacts from '../../database/fishingFacts';

const heroImage = require('../../assets/onboarding/river_banner_01.png');

export default function FieldDeskScreen() {
  const navigation = useNavigation<any>();
  const [savedCount, setSavedCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);
  const [plannedSpot, setPlannedSpot] = useState('');

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem('saved_places'),
        AsyncStorage.getItem('field_notes'),
        AsyncStorage.getItem('active_trip'),
      ]).then(values => {
        const saved = values[0] ? JSON.parse(values[0]) : [];
        const notes = values[1] ? JSON.parse(values[1]) : [];
        const trip = values[2] ? JSON.parse(values[2]) : null;
        setSavedCount(saved.length);
        setNoteCount(notes.length);
        setPlannedSpot(trip?.placeTitle ?? '');
      });
    }, []),
  );

  const dailyFact = useMemo(
    () =>
      fishingFacts[
        Math.floor(Date.now() / 86400000) % fishingFacts.length
      ],
    [],
  );
  const featured = fishingLocations.slice(0, 3);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Image source={heroImage} style={styles.heroImage} />
        <View style={styles.heroShade} />
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>BIG WATERS GUIDE</Text>
          <Text style={styles.heroTitle}>Plan the water,{'\n'}not just the route.</Text>
          <Text style={styles.heroText}>
            A field desk for calmer, better prepared days outside.
          </Text>
        </View>
      </View>

      <View style={styles.summary}>
        <Summary value={`${savedCount}`} label="saved waters" />
        <View style={styles.rule} />
        <Summary value={`${noteCount}`} label="field notes" />
        <View style={styles.rule} />
        <Summary value={plannedSpot ? '1' : '0'} label="active plan" />
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Your next move</Text>
        <Text style={styles.sectionHint}>TODAY</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.planCard}
        onPress={() => navigation.navigate('TripBoard')}>
        <View style={styles.planNumber}>
          <Text style={styles.planNumberText}>01</Text>
        </View>
        <View style={styles.planCopy}>
          <Text style={styles.planTitle}>
            {plannedSpot || 'Build a water plan'}
          </Text>
          <Text style={styles.planText}>
            {plannedSpot
              ? 'Your checklist is ready. Review it before leaving.'
              : 'Choose a destination, arrival window and field checklist.'}
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Waters to consider</Text>
        <TouchableOpacity onPress={() => navigation.navigate('WaterAtlas')}>
          <Text style={styles.link}>View atlas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rail}>
        {featured.map(place => (
          <TouchableOpacity
            key={place.id}
            style={styles.waterCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PlaceView', {place})}>
            <Image source={place.image} style={styles.waterImage} />
            <View style={styles.waterShade} />
            <View style={styles.waterCopy}>
              <Text style={styles.waterTitle}>{place.title}</Text>
              <Text style={styles.waterMeta}>
                {place.distance}  ·  {place.difficulty}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.insight}>
        <Text style={styles.insightLabel}>FIELD NOTE · {new Date().toLocaleDateString('en', {weekday: 'long'}).toUpperCase()}</Text>
        <Text style={styles.insightText}>{dailyFact}</Text>
      </View>
    </ScrollView>
  );
}

function Summary({value, label}: {value: string; label: string}) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#071B3F'},
  content: {paddingBottom: 120},
  hero: {
    height: 235,
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 14,
    borderRadius: 30,
    overflow: 'hidden',
  },
  heroImage: {...StyleSheet.absoluteFillObject, width: '100%', height: '100%'},
  heroShade: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(7,27,63,0.44)'},
  heroCopy: {position: 'absolute', left: 24, right: 24, bottom: 16},
  eyebrow: {color: '#FF8A3D', fontSize: 12, fontWeight: '900', letterSpacing: 2},
  heroTitle: {marginTop: 8, color: '#FFFFFF', fontSize: 35, lineHeight: 39, fontWeight: '800'},
  heroText: {marginTop: 10, maxWidth: 285, color: '#D8E5FF', fontSize: 15, lineHeight: 21},
  summary: {marginHorizontal: 20, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F2B50', borderRadius: 22},
  summaryItem: {flex: 1, alignItems: 'center'},
  summaryValue: {color: '#FFFFFF', fontSize: 22, fontWeight: '800'},
  summaryLabel: {marginTop: 3, color: '#8FA6CC', fontSize: 11},
  rule: {width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.12)'},
  sectionHead: {marginTop: 28, marginBottom: 13, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  sectionTitle: {color: '#FFFFFF', fontSize: 20, fontWeight: '800'},
  sectionHint: {color: '#8FA6CC', fontSize: 11, fontWeight: '800', letterSpacing: 1.4},
  link: {color: '#7FB0FF', fontSize: 13, fontWeight: '700'},
  planCard: {marginHorizontal: 20, minHeight: 116, padding: 18, borderRadius: 24, backgroundColor: '#2D7CFF', flexDirection: 'row', alignItems: 'center'},
  planNumber: {width: 44, height: 44, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.17)', alignItems: 'center', justifyContent: 'center'},
  planNumberText: {color: '#FFFFFF', fontSize: 14, fontWeight: '900'},
  planCopy: {flex: 1, marginLeft: 14},
  planTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  planText: {marginTop: 5, color: '#D8E5FF', fontSize: 13, lineHeight: 18},
  arrow: {color: '#FFFFFF', fontSize: 30, marginLeft: 8},
  rail: {paddingHorizontal: 20},
  waterCard: {width: 238, height: 180, marginRight: 12, borderRadius: 24, overflow: 'hidden'},
  waterImage: {...StyleSheet.absoluteFillObject, width: '100%', height: '100%'},
  waterShade: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(7,27,63,0.28)'},
  waterCopy: {position: 'absolute', left: 16, right: 16, bottom: 15},
  waterTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  waterMeta: {marginTop: 3, color: '#D8E5FF', fontSize: 12, fontWeight: '600'},
  insight: {margin: 20, marginTop: 28, padding: 20, borderRadius: 24, backgroundColor: '#0F2B50', borderLeftWidth: 3, borderLeftColor: '#FF7A1A'},
  insightLabel: {color: '#FF8A3D', fontSize: 11, fontWeight: '900', letterSpacing: 1},
  insightText: {marginTop: 10, color: '#DCE6F7', fontSize: 16, lineHeight: 24},
});
