import React, {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fishingFacts from '../../database/fishingFacts';

const avatar = require('../../assets/onboarding/guide.png');

const LIMIT = 5;

const STORE_KEY = 'daily_facts';

const PALETTE = [
  {emoji: '🌈', color: '#2FA85B'},
  {emoji: '✈️', color: '#12B3A6'},
  {emoji: '🐟', color: '#2D7CFF'},
  {emoji: '🌊', color: '#8B5CF6'},
  {emoji: '🎣', color: '#FF7A1A'},
];

function todayKey() {
  const now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function dayNumber() {
  return Math.floor(new Date().getTime() / 86400000);
}

export default function RippleWisdomScreen() {
  const [indices, setIndices] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, []),
  );

  async function load() {
    const value = await AsyncStorage.getItem(STORE_KEY);

    if (!value) {
      setIndices([]);
      return;
    }

    const data = JSON.parse(value);

    if (data.date === todayKey()) {
      setIndices(data.indices);
    } else {
      setIndices([]);
    }
  }

  async function generate() {
    if (indices.length >= LIMIT) {
      return;
    }

    const next =
      (dayNumber() * LIMIT + indices.length) % fishingFacts.length;

    const updated = [...indices, next];

    setIndices(updated);

    await AsyncStorage.setItem(
      STORE_KEY,
      JSON.stringify({date: todayKey(), indices: updated}),
    );
  }

  function share(text: string) {
    Share.share({message: text});
  }

  const count = indices.length;

  const reached = count >= LIMIT;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />

        <View>
          <Text style={styles.brand}>⚡ DAILY FACTS</Text>

          <Text style={styles.title}>Captain Pete's{'\n'}Fish Wisdom</Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View>
            <Text style={styles.progressLabel}>TODAY'S FACTS</Text>

            <Text style={styles.progressCount}>
              <Text style={styles.progressBig}>{count}</Text> of {LIMIT}
            </Text>
          </View>

          <View style={[styles.leftPill, reached && styles.leftPillFull]}>
            <Text
              style={[
                styles.leftText,
                reached && styles.leftTextFull,
              ]}>
              {reached ? '🔒 Limit reached' : `${LIMIT - count} left today`}
            </Text>
          </View>
        </View>

        <View style={styles.segments}>
          {Array.from({length: LIMIT}).map((_, i) => (
            <View
              key={i}
              style={[
                styles.segment,
                i < count && styles.segmentFilled,
              ]}
            />
          ))}
        </View>
      </View>

      {reached ? (
        <View style={styles.disabledBtn}>
          <Text style={styles.disabledText}>🔒 Daily Limit Reached</Text>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.generateBtn}
          onPress={generate}>
          <Text style={styles.generateText}>⚡ Generate Fact!</Text>
        </TouchableOpacity>
      )}

      {reached && (
        <View style={styles.limitNote}>
          <Text style={styles.limitNoteText}>
            🌙 You've used all {LIMIT} daily facts! Come back tomorrow for
            fresh wisdom from Captain Pete.
          </Text>
        </View>
      )}

      {count === 0 ? (
        <View style={styles.empty}>
          <Image source={avatar} style={styles.emptyAvatar} />

          <Text style={styles.emptyText}>
            Tap "Generate Fact" to discover amazing fishing wisdom from
            Captain Pete!
          </Text>

          <View style={styles.emojiRow}>
            <Text style={styles.rowEmoji}>🐟</Text>
            <Text style={styles.rowEmoji}>🌊</Text>
            <Text style={styles.rowEmoji}>⚓</Text>
            <Text style={styles.rowEmoji}>🎣</Text>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.wisdomLabel}>🎣 PETE'S WISDOM</Text>

          {[...indices].reverse().map((factIndex, i) => {
            const pal = PALETTE[factIndex % PALETTE.length];

            return (
              <View key={`${factIndex}-${i}`} style={styles.factCard}>
                <View style={styles.factHead}>
                  <View
                    style={[styles.factIcon, {backgroundColor: pal.color}]}>
                    <Text style={styles.factEmoji}>{pal.emoji}</Text>
                  </View>

                  <Text style={styles.factTag}>🐟 FISHING FACT</Text>
                </View>

                <Text style={styles.factText}>
                  {fishingFacts[factIndex]}
                </Text>

                <TouchableOpacity
                  style={styles.shareBtn}
                  activeOpacity={0.85}
                  onPress={() => share(fishingFacts[factIndex])}>
                  <Text style={styles.shareText}>
                    ↗ Share with Friends
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 130,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    backgroundColor: 'rgba(45,124,255,0.25)',
  },

  brand: {
    color: '#FF8A3D',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
  },

  progressCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressLabel: {
    color: '#8FA6CC',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  progressCount: {
    marginTop: 4,
    color: '#C7D6F0',
    fontSize: 18,
    fontWeight: '700',
  },

  progressBig: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  leftPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255,122,26,0.18)',
  },

  leftPillFull: {
    backgroundColor: 'rgba(255,80,80,0.18)',
  },

  leftText: {
    color: '#FF9A4D',
    fontSize: 13,
    fontWeight: '700',
  },

  leftTextFull: {
    color: '#FF6B6B',
  },

  segments: {
    flexDirection: 'row',
    marginTop: 16,
  },

  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  segmentFilled: {
    backgroundColor: '#FF7A1A',
  },

  generateBtn: {
    marginTop: 22,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FF7A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  generateText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  disabledBtn: {
    marginTop: 22,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledText: {
    color: '#7C8AA6',
    fontSize: 17,
    fontWeight: '800',
  },

  limitNote: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,80,80,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,80,80,0.25)',
  },

  limitNoteText: {
    color: '#E6B8B8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  empty: {
    alignItems: 'center',
    marginTop: 60,
  },

  emptyAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(45,124,255,0.18)',
  },

  emptyText: {
    marginTop: 22,
    color: '#9FB4D6',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  emojiRow: {
    flexDirection: 'row',
    marginTop: 22,
  },

  rowEmoji: {
    fontSize: 22,
    marginHorizontal: 8,
  },

  wisdomLabel: {
    marginTop: 24,
    marginBottom: 14,
    color: '#8FA6CC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  factCard: {
    marginBottom: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  factHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  factIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  factEmoji: {
    fontSize: 20,
  },

  factTag: {
    color: '#7FB0FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  factText: {
    color: '#DCE6F7',
    fontSize: 16,
    lineHeight: 24,
  },

  shareBtn: {
    marginTop: 16,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareText: {
    color: '#C7D6F0',
    fontSize: 15,
    fontWeight: '700',
  },
});
