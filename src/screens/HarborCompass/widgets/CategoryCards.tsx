import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CategoryCards({
  categories,
  onSelect,
}: any) {
  return (
    <View style={styles.row}>
      {categories.map((item: any) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.9}
          onPress={() => onSelect(item.id)}
          style={[styles.card, {backgroundColor: item.color}]}>
          <Text style={styles.emoji}>{item.emoji}</Text>

          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.count}>{item.count} spots</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },

  card: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 14,
    minHeight: 132,
    justifyContent: 'space-between',
  },

  emoji: {
    fontSize: 28,
  },

  title: {
    marginTop: 14,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  count: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
});
