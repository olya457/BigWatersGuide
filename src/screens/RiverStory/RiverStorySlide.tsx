import React from 'react';
import {
  ImageBackground,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  background: any;
  text: string;
  showGuide: boolean;
};

const guideImage = require('../../assets/onboarding/guide.png');

export default function RiverStorySlide({
  background,
  text,
  showGuide,
}: Props) {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
      </View>

      {showGuide && (
        <View style={styles.guideWrap} pointerEvents="none">
          <Image
            source={guideImage}
            style={styles.guide}
            resizeMode="contain"
          />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bubble: {
    marginTop: 80,
    marginHorizontal: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },

  text: {
    color: '#0B2A5B',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '700',
    textAlign: 'center',
  },

  guideWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '66%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  guide: {
    width: '92%',
    height: '100%',
  },
});
