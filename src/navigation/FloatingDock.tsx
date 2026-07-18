import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FieldDeskScreen from '../screens/FieldDesk/FieldDeskScreen';
import HarborCompassScreen from '../screens/HarborCompass/HarborCompassScreen';
import TripBoardScreen from '../screens/TripBoard/TripBoardScreen';
import LearningCurrentScreen from '../screens/LearningCurrent/LearningCurrentScreen';
import FieldLogScreen from '../screens/FieldLog/FieldLogScreen';
import JourneyRoutes from './JourneyRoutes';
import DockBar from '../components/navigation/DockBar';

const Tab = createBottomTabNavigator();
const renderDock = (props: any) => <DockBar {...props} />;

export default function FloatingDock() {
  return (
    <Tab.Navigator
      tabBar={renderDock}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={JourneyRoutes.FieldDesk}
        component={FieldDeskScreen}
      />

      <Tab.Screen
        name={JourneyRoutes.WaterAtlas}
        component={HarborCompassScreen}
      />

      <Tab.Screen
        name={JourneyRoutes.TripBoard}
        component={TripBoardScreen}
      />

      <Tab.Screen
        name={JourneyRoutes.LearningCurrent}
        component={LearningCurrentScreen}
      />

      <Tab.Screen
        name={JourneyRoutes.FieldLog}
        component={FieldLogScreen}
      />
    </Tab.Navigator>
  );
}
