import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './RootStack';

import useLaunchFlow from '../hooks/useLaunchFlow';

export default function AppNavigator() {
  const {loading, firstLaunch} =
    useLaunchFlow();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack
        firstLaunch={firstLaunch}
      />
    </NavigationContainer>
  );
}