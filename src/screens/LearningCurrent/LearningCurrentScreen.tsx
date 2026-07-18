import React, {useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import fishingArticles from '../../database/fishingArticles';
import fishingFacts from '../../database/fishingFacts';

const guidePortrait = require('../../assets/onboarding/guide.png');

export default function LearningCurrentScreen() {
  const navigation = useNavigation<any>();
  const dailyKnowledge = useMemo(
    () =>
      fishingFacts[
        Math.floor(Date.now() / 86400000) % fishingFacts.length
      ],
    [],
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.kicker}>WATER KNOWLEDGE</Text>
      <Text style={styles.title}>Learn to notice{'\n'}more outside.</Text>
      <Text style={styles.intro}>
        Small lessons for reading conditions, choosing gear and moving
        responsibly near the water.
      </Text>

      <View style={styles.lesson}>
        <View style={styles.lessonTop}>
          <Text style={styles.lessonNumber}>TODAY · 01</Text>
          <Text style={styles.lessonTime}>1 MIN</Text>
        </View>
        <Text style={styles.lessonTitle}>A detail worth remembering</Text>
        <Text style={styles.lessonText}>{dailyKnowledge}</Text>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Field reading</Text>
        <Text style={styles.sectionCount}>
          {fishingArticles.length.toString().padStart(2, '0')} NOTES
        </Text>
      </View>

      {fishingArticles.slice(0, 5).map((article, index) => (
        <TouchableOpacity
          key={article.id}
          activeOpacity={0.86}
          style={styles.article}
          onPress={() => navigation.navigate('ArticleView', {article})}>
          <Text style={styles.articleIndex}>
            {(index + 1).toString().padStart(2, '0')}
          </Text>
          <View style={styles.articleCopy}>
            <Text style={styles.articleTag}>{article.tag.toUpperCase()}</Text>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleMeta}>{article.readTime}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.challenge}
        onPress={() => navigation.navigate('KnowledgeChallenge')}>
        <View style={styles.challengeCopy}>
          <Text style={styles.challengeLabel}>KNOWLEDGE CHECK</Text>
          <Text style={styles.challengeTitle}>Test your water sense</Text>
          <Text style={styles.challengeText}>
            Ten quick questions based on the atlas and field notes.
          </Text>
          <Text style={styles.challengeAction}>Start challenge  →</Text>
        </View>
        <Image source={guidePortrait} style={styles.guide} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#071B3F'},
  content: {paddingTop: 62, paddingHorizontal: 20, paddingBottom: 125},
  kicker: {
    color: '#FF8A3D',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.8,
  },
  title: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '800',
  },
  intro: {
    marginTop: 11,
    maxWidth: 340,
    color: '#9FB4D6',
    fontSize: 15,
    lineHeight: 22,
  },
  lesson: {
    marginTop: 26,
    padding: 21,
    borderRadius: 25,
    backgroundColor: '#2D7CFF',
  },
  lessonTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonNumber: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  lessonTime: {
    color: '#D8E5FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  lessonTitle: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  lessonText: {
    marginTop: 9,
    color: '#EAF3FF',
    fontSize: 15,
    lineHeight: 23,
  },
  sectionHead: {
    marginTop: 30,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {color: '#FFFFFF', fontSize: 20, fontWeight: '800'},
  sectionCount: {
    color: '#8FA6CC',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  article: {
    minHeight: 104,
    marginBottom: 10,
    paddingHorizontal: 16,
    borderRadius: 21,
    backgroundColor: '#0F2B50',
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleIndex: {
    width: 34,
    color: '#7FB0FF',
    fontSize: 12,
    fontWeight: '900',
  },
  articleCopy: {flex: 1, paddingVertical: 15},
  articleTag: {
    color: '#FF8A3D',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  articleTitle: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  articleMeta: {marginTop: 5, color: '#8FA6CC', fontSize: 11},
  arrow: {color: '#7FB0FF', fontSize: 26, marginLeft: 8},
  challenge: {
    minHeight: 185,
    marginTop: 18,
    padding: 21,
    borderRadius: 25,
    backgroundColor: '#0F2B50',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  challengeCopy: {flex: 1, zIndex: 1},
  challengeLabel: {
    color: '#FF8A3D',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  challengeTitle: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  challengeText: {
    marginTop: 7,
    maxWidth: 235,
    color: '#9FB4D6',
    fontSize: 13,
    lineHeight: 18,
  },
  challengeAction: {
    marginTop: 16,
    color: '#7FB0FF',
    fontSize: 14,
    fontWeight: '800',
  },
  guide: {
    position: 'absolute',
    width: 115,
    height: 155,
    right: -12,
    bottom: -14,
    resizeMode: 'contain',
    opacity: 0.72,
  },
});
