import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function BannerHeader() {
  return (
    <ImageBackground
      source={require('../../../assets/onboarding/river_banner_01.png')}
      style={styles.banner}
      imageStyle={styles.image}>
      <View style={styles.overlay}>

        <Text style={styles.small}>
          Discover peaceful places
        </Text>

        <Text style={styles.title}>
          Fishing Explorer
        </Text>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 270,
    justifyContent: 'flex-end',
  },

  image: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  overlay: {
    padding: 24,
  },

  small: {
    color: '#DCE8FF',
    fontSize: 15,
  },

  title: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },
});