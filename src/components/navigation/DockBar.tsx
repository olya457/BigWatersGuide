import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const tabMeta: Record<string, {icon: string; label: string}> = {
  FieldDesk: {icon: '⌂', label: 'Desk'},
  WaterAtlas: {icon: '⌖', label: 'Atlas'},
  TripBoard: {icon: '◇', label: 'Plan'},
  LearningCurrent: {icon: '◫', label: 'Learn'},
  FieldLog: {icon: '≡', label: 'Log'},
};

export default function DockBar({
  state,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const meta =
          tabMeta[route.name] ?? {icon: '•', label: route.name};

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.tab}>
            <View
              style={[
                styles.iconBox,
                focused && styles.iconBoxActive,
              ]}>
              <Text style={styles.icon}>{meta.icon}</Text>
            </View>

            <Text
              style={[
                styles.label,
                focused && styles.labelActive,
              ]}>
              {meta.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: Platform.OS === 'ios' ? 28 : 18,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#0C2444',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 8},
    elevation: 12,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBox: {
    width: 36,
    height: 32,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBoxActive: {
    backgroundColor: '#2D7CFF',
  },

  icon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  label: {
    marginTop: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#8FA6CC',
  },

  labelActive: {
    color: '#7FB0FF',
  },
});
