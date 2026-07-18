import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EchoVoyageStart from '../screens/EchoVoyage/EchoVoyageStart';
import EchoVoyagePlay from '../screens/EchoVoyage/EchoVoyagePlay';
import EchoVoyageFinish from '../screens/EchoVoyage/EchoVoyageFinish';

const Stack = createNativeStackNavigator();

export default function EchoVoyageNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="EchoVoyageStart"
        component={EchoVoyageStart}
      />

      <Stack.Screen
        name="EchoVoyagePlay"
        component={EchoVoyagePlay}
      />

      <Stack.Screen
        name="EchoVoyageFinish"
        component={EchoVoyageFinish}
      />
    </Stack.Navigator>
  );
}
