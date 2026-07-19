import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RiverLocation} from '../types/location';
import {RiverArticle} from '../types/article';

import LaunchRiverScreen from '../screens/LaunchRiver/LaunchRiverScreen';
import RiverStoryScreen from '../screens/RiverStory/RiverStoryScreen';
import FloatingDock from './FloatingDock';
import PlaceViewScreen from '../screens/PlaceView/PlaceViewScreen';
import DriftArticleScreen from '../screens/DriftLibrary/DriftArticleScreen';
import EchoVoyageNavigator from './EchoVoyageNavigator';
import HorizonChartScreen from '../screens/HorizonChart/HorizonChartScreen';

export type RootStackParamList = {
  LaunchRiver: {firstLaunch: boolean} | undefined;

  RiverStory: undefined;

  FloatingDock: undefined;

  PlaceView: {
    place: RiverLocation;
  };

  ArticleView: {
    article: RiverArticle;
  };

  KnowledgeChallenge: undefined;

  HorizonChart: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

type Props = {
  firstLaunch: boolean;
};

export default function RootStack({firstLaunch}: Props) {
  return (
    <Stack.Navigator
      initialRouteName="LaunchRiver"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="LaunchRiver"
        component={LaunchRiverScreen}
        initialParams={{firstLaunch}}
      />

      <Stack.Screen
        name="RiverStory"
        component={RiverStoryScreen}
      />

      <Stack.Screen
        name="FloatingDock"
        component={FloatingDock}
      />

      <Stack.Screen
        name="PlaceView"
        component={PlaceViewScreen}
      />

      <Stack.Screen
        name="ArticleView"
        component={DriftArticleScreen}
      />

      <Stack.Screen
        name="KnowledgeChallenge"
        component={EchoVoyageNavigator}
      />

      <Stack.Screen
        name="HorizonChart"
        component={HorizonChartScreen}
      />
    </Stack.Navigator>
  );
}
