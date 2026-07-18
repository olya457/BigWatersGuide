import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

type Props = {
  place: any;
  onPress: () => void;
  onClose: () => void;
};

export default function PlacePreview({
  place,
  onPress,
  onClose,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={place.image}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.close}
        activeOpacity={0.85}
        onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {place.title}
        </Text>

        <Text style={styles.subtitle}>
          ⭐ {place.rating} · 📍 {place.distance}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onPress}>
          <Text style={styles.buttonText}>
            View Place
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: Platform.OS === 'ios' ? 120 : 120,
    backgroundColor: '#0F2B50',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  image: {
    width: '100%',
    height: 170,
  },

  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(7,27,63,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  content: {
    padding: 18,
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 8,
    color: '#C7D6F0',
    fontSize: 15,
  },

  button: {
    marginTop: 18,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D7CFF',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});