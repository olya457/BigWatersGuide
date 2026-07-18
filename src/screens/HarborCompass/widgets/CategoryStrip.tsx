import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const items = [
  {id: 'all', title: 'All', emoji: '🌊'},
  {id: 'spots', title: 'Fishing', emoji: '🎣'},
  {id: 'nature', title: 'Nature', emoji: '🌿'},
  {id: 'hidden', title: 'Hidden', emoji: '💎'},
];

export default function CategoryStrip({value, onChange}: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}>
      {items.map(item => {
        const active = value === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onChange(item.id)}
            style={[styles.item, active && styles.active]}>
            <Text style={styles.emoji}>{item.emoji}</Text>

            <Text
              style={[styles.text, active && styles.activeText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  active: {
    backgroundColor: '#2D7CFF',
  },

  emoji: {
    fontSize: 16,
    marginRight: 8,
  },

  text: {
    color: '#C7D6F0',
    fontWeight: '700',
  },

  activeText: {
    color: '#FFFFFF',
  },
});
