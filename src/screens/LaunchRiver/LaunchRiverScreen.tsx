import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../navigation/RootStack';
import colors from '../../constants/colors';
import loaderHtml from './loaderHtml';

const LOADER_DURATION = 3200;
const ICON_HOLD = 1500;
const FADE_DURATION = 450;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LaunchRiver'
>;

type LaunchRoute = RouteProp<RootStackParamList, 'LaunchRiver'>;

export default function LaunchRiverScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<LaunchRoute>();

  const firstLaunch = route.params?.firstLaunch ?? true;

  const [showIcon, setShowIcon] = useState(false);

  const loaderOpacity = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toIcon = setTimeout(() => {
      setShowIcon(true);

      Animated.parallel([
        Animated.timing(loaderOpacity, {
          toValue: 0,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }, LOADER_DURATION);

    const toNext = setTimeout(() => {
      navigation.replace(
        firstLaunch ? 'RiverStory' : 'FloatingDock',
      );
    }, LOADER_DURATION + FADE_DURATION + ICON_HOLD);

    return () => {
      clearTimeout(toIcon);
      clearTimeout(toNext);
    };
  }, [navigation, firstLaunch, loaderOpacity, iconOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />

      <Animated.View
        style={[styles.center, {opacity: loaderOpacity}]}
        pointerEvents="none">
        <WebView
          style={styles.web}
          containerStyle={styles.web}
          source={{html: loaderHtml}}
          originWhitelist={['*']}
          scrollEnabled={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          javaScriptEnabled
          androidLayerType={Platform.OS === 'android' ? 'hardware' : 'none'}
          textZoom={100}
          scalesPageToFit={false}
          backgroundColor="transparent"
        />
      </Animated.View>

      {showIcon && (
        <Animated.View
          style={[styles.center, styles.iconLayer, {opacity: iconOpacity}]}
          pointerEvents="none">
          <Image
            source={require('../../assets/onboarding/icon1.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconLayer: {
    backgroundColor: colors.background,
  },

  web: {
    width: 240,
    height: 240,
    backgroundColor: 'transparent',
  },

  icon: {
    width: 150,
    height: 150,
    borderRadius: 34,
  },
});
