import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import fishingArticles from '../../database/fishingArticles';

const avatar = require('../../assets/onboarding/guide.png');

export default function DriftLibraryScreen() {
  const navigation = useNavigation<any>();

  return (
    <FlatList
      style={styles.container}
      data={fishingArticles}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Text style={styles.headerEmoji}>📖</Text>
            </View>

            <View>
              <Text style={styles.headerTitle}>Guide's Blog</Text>

              <Text style={styles.headerSub}>
                Tales & tips from Captain Pete
              </Text>
            </View>
          </View>

          <View style={styles.authorCard}>
            <Image source={avatar} style={styles.authorAvatar} />

            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>Captain Pete</Text>

              <Text style={styles.authorRole}>
                Your local fishing guide & storyteller
              </Text>

              <Text style={styles.authorYears}>
                🎣 30 years on these waters
              </Text>
            </View>
          </View>

          <Text style={styles.count}>
            📖 {fishingArticles.length} ARTICLES
          </Text>
        </>
      }
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.excerpt}>{item.excerpt}</Text>

          <View style={styles.cardBottom}>
            <Image source={avatar} style={styles.smallAvatar} />

            <View style={styles.byline}>
              <Text style={styles.byName}>{item.author}</Text>

              <Text style={styles.byTime}>🕐 {item.readTime}</Text>
            </View>

            <TouchableOpacity
              style={styles.readBtn}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('ArticleView', {article: item})
              }>
              <Text style={styles.readText}>Read More ›</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  list: {
    paddingBottom: 130,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 64,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(45,124,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerEmoji: {
    fontSize: 22,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  headerSub: {
    marginTop: 2,
    color: '#9FB4D6',
    fontSize: 14,
  },

  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 22,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(45,124,255,0.35)',
  },

  authorAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(45,124,255,0.25)',
  },

  authorInfo: {
    flex: 1,
    marginLeft: 14,
  },

  authorName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  authorRole: {
    marginTop: 2,
    color: '#9FB4D6',
    fontSize: 13,
  },

  authorYears: {
    marginTop: 6,
    color: '#7FB0FF',
    fontSize: 13,
    fontWeight: '700',
  },

  count: {
    marginTop: 24,
    marginBottom: 14,
    marginHorizontal: 20,
    color: '#8FA6CC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#0F2B50',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  excerpt: {
    color: '#DCE6F7',
    fontSize: 16,
    lineHeight: 24,
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  smallAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(45,124,255,0.25)',
  },

  byline: {
    flex: 1,
    marginLeft: 10,
  },

  byName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  byTime: {
    marginTop: 1,
    color: '#8FA6CC',
    fontSize: 12,
  },

  readBtn: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2D7CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  readText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
