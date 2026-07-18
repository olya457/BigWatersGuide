import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import fishingQuiz from '../../database/fishingQuiz';

export default function EchoVoyageStart() {
  const navigation = useNavigation<any>();

  const total = fishingQuiz.length;

  const rules = [
    {emoji: '❓', text: `${total} questions about fishing locations`},
    {emoji: '⏱️', text: '15 seconds per question'},
    {emoji: '✅', text: '4 choices — only 1 is correct'},
    {emoji: '🏆', text: 'Beat your personal best score'},
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.target}>🎯</Text>

      <Text style={styles.brand}>🎣 FISHGUIDE</Text>

      <Text style={styles.title}>Fishing Spots{'\n'}Quiz</Text>

      <Text style={styles.subtitle}>
        Test your knowledge of fishing spots, techniques, and Captain
        Pete's tips!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>HOW TO PLAY</Text>

        {rules.map(rule => (
          <View key={rule.text} style={styles.rule}>
            <Text style={styles.ruleEmoji}>{rule.emoji}</Text>

            <Text style={styles.ruleText}>{rule.text}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.startBtn}
        onPress={() => navigation.navigate('EchoVoyagePlay')}>
        <Text style={styles.startText}>🎯  Start Quiz!</Text>
      </TouchableOpacity>

      <View style={styles.emojiRow}>
        <Text style={styles.rowEmoji}>🐟</Text>
        <Text style={styles.rowEmoji}>🌊</Text>
        <Text style={styles.rowEmoji}>🎣</Text>
        <Text style={styles.rowEmoji}>⚓</Text>
        <Text style={styles.rowEmoji}>🐠</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  content: {
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 130,
    alignItems: 'center',
  },

  target: {
    fontSize: 60,
  },

  brand: {
    marginTop: 16,
    color: '#FF8A3D',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 38,
  },

  subtitle: {
    marginTop: 14,
    color: '#9FB4D6',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  card: {
    marginTop: 30,
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardLabel: {
    color: '#8FA6CC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 16,
  },

  rule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  ruleEmoji: {
    fontSize: 20,
    width: 34,
  },

  ruleText: {
    flex: 1,
    color: '#DCE6F7',
    fontSize: 15,
  },

  startBtn: {
    marginTop: 30,
    width: '100%',
    height: 62,
    borderRadius: 18,
    backgroundColor: '#FF7A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  startText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  emojiRow: {
    flexDirection: 'row',
    marginTop: 28,
  },

  rowEmoji: {
    fontSize: 22,
    marginHorizontal: 8,
    opacity: 0.7,
  },
});
