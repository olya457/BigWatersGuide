import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import fishingQuiz from '../../database/fishingQuiz';

const QUESTION_TIME = 15;

const LETTERS = ['A', 'B', 'C', 'D'];

export default function EchoVoyagePlay() {
  const navigation = useNavigation<any>();

  const total = fishingQuiz.length;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const selectedRef = useRef<number | null>(null);
  const advanceRef = useRef<any>(null);
  const startRef = useRef(Date.now());
  const scoreRef = useRef(0);

  const question = fishingQuiz[index];

  useEffect(() => {
    selectedRef.current = null;
    setSelected(null);
    setTimeLeft(QUESTION_TIME);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (selectedRef.current !== null) {
          return prev;
        }

        if (prev <= 1) {
          lock(-1);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);

      if (advanceRef.current) {
        clearTimeout(advanceRef.current);
      }
    };
  }, [index]);

  function lock(answer: number) {
    if (selectedRef.current !== null) {
      return;
    }

    selectedRef.current = answer;
    setSelected(answer);

    if (answer === question.correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }

    advanceRef.current = setTimeout(advance, 1400);
  }

  function advance() {
    if (index + 1 >= total) {
      const seconds = Math.round(
        (Date.now() - startRef.current) / 1000,
      );

      navigation.replace('EchoVoyageFinish', {
        score: scoreRef.current,
        total,
        seconds,
      });

      return;
    }

    setIndex(index + 1);
  }

  const correct = selected !== null && selected === question.correct;

  const wrong =
    selected !== null && selected !== question.correct;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.progressText}>
            Question {index + 1} <Text style={styles.of}>of {total}</Text>
          </Text>

          <View style={styles.trophy}>
            <Text style={styles.trophyText}>🏆 {score}</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${((index + 1) / total) * 100}%`},
            ]}
          />
        </View>

        <View style={styles.timerRow}>
          <Text style={styles.timerIcon}>🕐</Text>

          <View style={styles.timerBar}>
            <View
              style={[
                styles.timerFill,
                {width: `${(timeLeft / QUESTION_TIME) * 100}%`},
              ]}
            />
          </View>

          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.rod}>🎣</Text>

        <Text style={styles.question}>{question.question}</Text>
      </View>

      {question.answers.map((answer, i) => {
        const isCorrect = selected !== null && i === question.correct;
        const isWrongPick =
          selected !== null && i === selected && i !== question.correct;
        const dim = selected !== null && !isCorrect && !isWrongPick;

        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.9}
            disabled={selected !== null}
            onPress={() => lock(i)}
            style={[
              styles.answer,
              isCorrect && styles.answerCorrect,
              isWrongPick && styles.answerWrong,
              dim && styles.answerDim,
            ]}>
            <View
              style={[
                styles.letter,
                isCorrect && styles.letterCorrect,
                isWrongPick && styles.letterWrong,
              ]}>
              <Text style={styles.letterText}>{LETTERS[i]}</Text>
            </View>

            <Text style={styles.answerText}>{answer}</Text>

            {isCorrect && <Text style={styles.mark}>🎉</Text>}
            {isWrongPick && <Text style={styles.mark}>❤️</Text>}
          </TouchableOpacity>
        );
      })}

      {correct && (
        <View style={[styles.feedback, styles.feedbackOk]}>
          <Text style={styles.feedbackTitle}>✅ Correct!</Text>
        </View>
      )}

      {wrong && (
        <View style={[styles.feedback, styles.feedbackBad]}>
          <Text style={styles.feedbackTitle}>💔 Not quite right!</Text>

          <Text style={styles.feedbackSub}>
            The answer was: {question.answers[question.correct]}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  of: {
    color: '#8FA6CC',
    fontWeight: '600',
  },

  trophy: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255,184,0,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.4)',
  },

  trophyText: {
    color: '#FFC53D',
    fontSize: 14,
    fontWeight: '800',
  },

  progressBar: {
    marginTop: 12,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#2D7CFF',
  },

  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#0F2B50',
    borderRadius: 14,
    padding: 12,
  },

  timerIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  timerBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },

  timerFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#3DD68C',
  },

  timerText: {
    marginLeft: 10,
    color: '#3DD68C',
    fontSize: 15,
    fontWeight: '800',
    width: 38,
    textAlign: 'right',
  },

  questionCard: {
    backgroundColor: '#0F2B50',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 22,
    marginBottom: 22,
  },

  rod: {
    fontSize: 26,
    marginBottom: 12,
  },

  question: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 27,
  },

  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2B50',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    marginBottom: 12,
  },

  answerCorrect: {
    backgroundColor: 'rgba(61,214,140,0.18)',
    borderColor: '#3DD68C',
  },

  answerWrong: {
    backgroundColor: 'rgba(255,80,80,0.18)',
    borderColor: '#FF6B6B',
  },

  answerDim: {
    opacity: 0.5,
  },

  letter: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  letterCorrect: {
    backgroundColor: '#3DD68C',
  },

  letterWrong: {
    backgroundColor: '#FF6B6B',
  },

  letterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  answerText: {
    flex: 1,
    color: '#EAF1FB',
    fontSize: 16,
    fontWeight: '600',
  },

  mark: {
    fontSize: 18,
    marginLeft: 8,
  },

  feedback: {
    marginTop: 6,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  feedbackOk: {
    backgroundColor: 'rgba(61,214,140,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(61,214,140,0.3)',
  },

  feedbackBad: {
    backgroundColor: 'rgba(255,80,80,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,80,80,0.25)',
  },

  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  feedbackSub: {
    marginTop: 4,
    color: '#C7D6F0',
    fontSize: 14,
  },
});
