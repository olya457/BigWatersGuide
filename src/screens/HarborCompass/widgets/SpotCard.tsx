import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SpotCard({
  image,
  title,
  subtitle,
  rating,
  distance,
  badge,
  badgeColor = '#2D7CFF',
  onPress,
}: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image source={image} style={styles.image} />

        {badge ? (
          <View
            style={[
              styles.badge,
              {backgroundColor: badgeColor},
            ]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}

        <View style={styles.row}>
          <View style={styles.meta}>
            <Text style={styles.metaText}>⭐ {rating}</Text>

            <Text style={styles.metaText}>📍 {distance}</Text>
          </View>

          <View style={styles.open}>
            <Text style={styles.openText}>Open ›</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 18,
    backgroundColor: '#0F2B50',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },

  imageWrap: {
    width: '100%',
    height: 190,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  content: {
    padding: 16,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: 6,
    color: '#9FB4D6',
    fontSize: 14,
  },

  row: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaText: {
    marginRight: 16,
    color: '#C7D6F0',
    fontSize: 14,
    fontWeight: '600',
  },

  open: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D7CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  openText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
