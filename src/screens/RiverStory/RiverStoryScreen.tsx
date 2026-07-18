import React, {useRef, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RiverStorySlide from './RiverStorySlide';

const {width} = Dimensions.get('window');

const launchRiver = require('../../assets/onboarding/launch_river.png');
const welcomeCurrent = require('../../assets/onboarding/welcome_current.png');

const slides = [
  {
    id: 'guide',
    background: launchRiver,
    showGuide: true,
    text:
      "Hey there, explorer. I'm your local fishing guide. I'll help you find calm waters, hidden places, and fishing spots worth remembering.",
  },
  {
    id: 'browse',
    background: launchRiver,
    showGuide: true,
    text:
      'Browse fishing places, scenic nature routes, and hidden local gems. Each location includes useful details, local tips, distance, difficulty, and the best time to visit.',
  },
  {
    id: 'save',
    background: launchRiver,
    showGuide: true,
    text:
      'Found a place you like? Save it for later. Your favorite docks, lakes, trails, and secret corners will always be one tap away.',
  },
  {
    id: 'map',
    background: welcomeCurrent,
    showGuide: false,
    text:
      'Open the map to see every location, check where it is, and jump straight into the details. The water has many stories, and the map shows where they begin.',
  },
  {
    id: 'quiz',
    background: launchRiver,
    showGuide: true,
    text:
      'Read fishing stories from your guide, discover daily facts, and test your knowledge in the quiz. Big Water Guide is your playful companion for every fishing adventure.',
  },
];

export default function RiverStoryScreen() {
  const navigation = useNavigation<any>();

  const listRef = useRef<FlatList>(null);

  const [page, setPage] = useState(0);

  const isLast = page === slides.length - 1;

  const next = async () => {
    if (isLast) {
      await AsyncStorage.setItem(
        'river_first_launch',
        'completed',
      );

      navigation.replace('FloatingDock');
      return;
    }

    listRef.current?.scrollToIndex({
      index: page + 1,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{width}}>
            <RiverStorySlide
              background={item.background}
              text={item.text}
              showGuide={item.showGuide}
            />
          </View>
        )}
        onMomentumScrollEnd={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width,
          );

          setPage(index);
        }}
      />

      <View style={styles.bottom} pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={next}>
          <Text style={styles.buttonText}>
            {isLast ? 'START  ›' : 'Next  ›'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B3F',
  },

  bottom: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 48,
    alignItems: 'center',
  },

  button: {
    width: '70%',
    height: 58,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D7CFF',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
});
