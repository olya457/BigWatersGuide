import React from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const avatar = require('../../assets/onboarding/guide.png');

export default function DriftArticleScreen() {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const {article} = params;

  const paragraphs = article.content
    .split('\n\n')
    .map((item: string) => item.trim())
    .filter(Boolean);

  const onShare = () => {
    Share.share({
      title: article.title,
      message: `${article.title}\n\n${article.excerpt}`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>

          <Text style={styles.backText}>Blog</Text>
        </TouchableOpacity>

        <View style={styles.tag}>
          <Text style={styles.tagText}>{article.tag}</Text>
        </View>

        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.authorRow}>
          <Image source={avatar} style={styles.avatar} />

          <View style={styles.byline}>
            <Text style={styles.byName}>{article.author}</Text>

            <Text style={styles.byTime}>🕐 {article.readTime}</Text>
          </View>

          <TouchableOpacity
            style={styles.share}
            activeOpacity={0.85}
            onPress={onShare}>
            <Text style={styles.shareText}>↗ Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}>
        {paragraphs.map((text: string, index: number) => (
          <View key={index} style={styles.paragraph}>
            <Text style={styles.paragraphText}>{text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  hero: {
    backgroundColor: '#1F5FCC',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 24 : 56,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 40,
    paddingRight: 14,
  },

  backIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginRight: 4,
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  tag: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },

  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  title: {
    marginTop: 12,
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
    lineHeight: 33,
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  byline: {
    flex: 1,
    marginLeft: 12,
  },

  byName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  byTime: {
    marginTop: 1,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },

  share: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  shareText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  body: {
    flex: 1,
  },

  bodyContent: {
    padding: 20,
    paddingBottom: 130,
  },

  paragraph: {
    backgroundColor: '#0F2B50',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 14,
  },

  paragraphText: {
    color: '#DCE6F7',
    fontSize: 16,
    lineHeight: 26,
  },
});
