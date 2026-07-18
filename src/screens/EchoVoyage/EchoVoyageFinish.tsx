import React, {useEffect, useState} from 'react';
import {
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EchoVoyageFinish() {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const score = params.score as number;
  const total = params.total as number;
  const seconds = params.seconds as number;

  const [best, setBest] = useState(score);

  useEffect(() => {
    async function saveBest() {
      const value = await AsyncStorage.getItem('quiz_best');
      const previousBest = value ? Number(value) : 0;
      const nextBest = Math.max(previousBest, score);

      setBest(nextBest);
      await AsyncStorage.setItem('quiz_best', String(nextBest));
    }

    saveBest();
  }, [score]);

  const ratio = score / total;

  const title =
    ratio >= 0.8
      ? 'Great Job!'
      : ratio >= 0.5
      ? 'Good Effort!'
      : 'Keep Practicing!';

  const onShare = () => {
    Share.share({
      message: `I scored ${score}/${total} on the Big Water Guide fishing quiz! 🎣`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.star}>⭐</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>Quiz Complete!</Text>

      <View style={styles.circle}>
        <Text style={styles.circleScore}>{score}</Text>

        <Text style={styles.circleTotal}>/{total}</Text>
      </View>

      <View style={styles.stats}>
        <Stat emoji="🎯" value={`${score}/${total}`} label="Score" />

        <Stat emoji="⏱️" value={`${seconds}s`} label="Time" />

        <Stat emoji="🏆" value={`${best}/${total}`} label="Best" />
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.btn, styles.retry]}
        onPress={() => navigation.replace('EchoVoyageStart')}>
        <Text style={styles.btnText}>🔄  Retry Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.btn, styles.share]}
        onPress={onShare}>
        <Text style={styles.btnText}>↗  Share Score</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.btn, styles.explore]}
        onPress={() =>
          navigation.navigate('FloatingDock', {screen: 'WaterAtlas'})
        }>
        <Text style={styles.btnText}>Explore the Water Atlas</Text>
      </TouchableOpacity>
    </View>
  );
}

function Stat({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statEmoji}>{emoji}</Text>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  star: {
    fontSize: 64,
  },

  title: {
    marginTop: 10,
    color: '#7FB0FF',
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: 6,
    color: '#9FB4D6',
    fontSize: 16,
  },

  circle: {
    marginTop: 26,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(45,124,255,0.5)',
    backgroundColor: 'rgba(45,124,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  circleScore: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '800',
  },

  circleTotal: {
    color: '#8FA6CC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: -12,
  },

  stats: {
    flexDirection: 'row',
    marginTop: 34,
    width: '100%',
  },

  stat: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },

  statEmoji: {
    fontSize: 22,
  },

  statValue: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  statLabel: {
    marginTop: 2,
    color: '#8FA6CC',
    fontSize: 12,
    fontWeight: '600',
  },

  btn: {
    marginTop: 14,
    width: '100%',
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  retry: {
    marginTop: 34,
    backgroundColor: '#FF7A1A',
  },

  share: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  explore: {
    backgroundColor: '#2D7CFF',
  },

  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
