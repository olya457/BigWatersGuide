import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fishingLocations from '../../database/fishingLocations';

const windows = ['Dawn', 'Morning', 'Afternoon', 'Sunset'];
const defaultTasks = [
  'Check local conditions',
  'Pack water and first aid',
  'Inspect line and tackle',
  'Save an offline contact',
];

type TripPlan = {
  placeId: string;
  placeTitle: string;
  window: string;
  tasks: string[];
};

export default function TripBoardScreen() {
  const [placeId, setPlaceId] = useState(fishingLocations[0].id);
  const [window, setWindow] = useState(windows[0]);
  const [done, setDone] = useState<string[]>([]);
  const [hasPlan, setHasPlan] = useState(false);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('active_trip').then(value => {
        if (!value) {
          return;
        }
        const plan: TripPlan = JSON.parse(value);
        setPlaceId(plan.placeId);
        setWindow(plan.window);
        setDone(plan.tasks || []);
        setHasPlan(true);
      });
    }, []),
  );

  const selected = fishingLocations.find(item => item.id === placeId)!;

  async function savePlan() {
    const plan: TripPlan = {
      placeId,
      placeTitle: selected.title,
      window,
      tasks: done,
    };
    await AsyncStorage.setItem('active_trip', JSON.stringify(plan));
    setHasPlan(true);
  }

  async function clearPlan() {
    await AsyncStorage.removeItem('active_trip');
    setDone([]);
    setHasPlan(false);
  }

  function toggleTask(task: string) {
    setDone(current =>
      current.includes(task)
        ? current.filter(item => item !== task)
        : [...current, task],
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.kicker}>TRIP WORKSPACE</Text>
      <Text style={styles.title}>Shape your next{'\n'}day on the water.</Text>
      <Text style={styles.intro}>
        One compact plan keeps the useful details close and the noise away.
      </Text>

      <Step index="01" title="Choose a water" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fishingLocations.slice(0, 8).map(place => {
          const active = place.id === placeId;
          return (
            <TouchableOpacity
              key={place.id}
              onPress={() => setPlaceId(place.id)}
              style={[styles.choice, active && styles.choiceActive]}>
              <Text style={[styles.choiceTitle, active && styles.activeText]}>
                {place.title}
              </Text>
              <Text style={[styles.choiceMeta, active && styles.activeSub]}>
                {place.distance} · {place.difficulty}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Step index="02" title="Set arrival window" />
      <View style={styles.windowGrid}>
        {windows.map(item => {
          const active = item === window;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setWindow(item)}
              style={[styles.window, active && styles.windowActive]}>
              <Text style={[styles.windowText, active && styles.activeText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Step index="03" title="Pre-departure check" />
      <View style={styles.checklist}>
        {defaultTasks.map(task => {
          const checked = done.includes(task);
          return (
            <TouchableOpacity
              key={task}
              onPress={() => toggleTask(task)}
              style={styles.checkRow}>
              <View style={[styles.check, checked && styles.checkActive]}>
                <Text style={styles.checkMark}>{checked ? '✓' : ''}</Text>
              </View>
              <Text style={[styles.checkText, checked && styles.checkTextDone]}>
                {task}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.brief}>
        <Text style={styles.briefLabel}>PLAN SUMMARY</Text>
        <Text style={styles.briefTitle}>{selected.title}</Text>
        <Text style={styles.briefMeta}>
          {window} arrival · {selected.bestTime}
        </Text>
        <Text style={styles.briefMeta}>
          {done.length}/{defaultTasks.length} checks complete
        </Text>
      </View>

      <TouchableOpacity style={styles.primary} onPress={savePlan}>
        <Text style={styles.primaryText}>
          {hasPlan ? 'Update active plan' : 'Make this my active plan'}
        </Text>
      </TouchableOpacity>
      {hasPlan && (
        <TouchableOpacity style={styles.clear} onPress={clearPlan}>
          <Text style={styles.clearText}>Clear current plan</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function Step({index, title}: {index: string; title: string}) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepIndex}>{index}</Text>
      <Text style={styles.stepTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#071B3F'},
  content: {paddingTop: 62, paddingHorizontal: 20, paddingBottom: 125},
  kicker: {color: '#FF8A3D', fontSize: 12, fontWeight: '900', letterSpacing: 1.8},
  title: {marginTop: 10, color: '#FFFFFF', fontSize: 34, lineHeight: 39, fontWeight: '800'},
  intro: {marginTop: 12, maxWidth: 330, color: '#9FB4D6', fontSize: 15, lineHeight: 22},
  step: {marginTop: 30, marginBottom: 13, flexDirection: 'row', alignItems: 'center'},
  stepIndex: {color: '#7FB0FF', fontSize: 12, fontWeight: '900', letterSpacing: 1},
  stepTitle: {marginLeft: 12, color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  choice: {width: 205, minHeight: 88, padding: 16, marginRight: 10, borderRadius: 20, backgroundColor: '#0F2B50', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'},
  choiceActive: {backgroundColor: '#2D7CFF', borderColor: '#2D7CFF'},
  choiceTitle: {color: '#FFFFFF', fontSize: 16, fontWeight: '800'},
  choiceMeta: {marginTop: 7, color: '#8FA6CC', fontSize: 12},
  activeText: {color: '#FFFFFF'},
  activeSub: {color: '#D8E5FF'},
  windowGrid: {flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5},
  window: {width: '47.3%', height: 52, margin: 5, borderRadius: 17, backgroundColor: '#0F2B50', alignItems: 'center', justifyContent: 'center'},
  windowActive: {backgroundColor: '#2D7CFF'},
  windowText: {color: '#9FB4D6', fontSize: 14, fontWeight: '700'},
  checklist: {padding: 7, borderRadius: 22, backgroundColor: '#0F2B50'},
  checkRow: {minHeight: 54, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center'},
  check: {width: 25, height: 25, borderRadius: 8, borderWidth: 1, borderColor: '#8FA6CC', alignItems: 'center', justifyContent: 'center'},
  checkActive: {backgroundColor: '#FF7A1A', borderColor: '#FF7A1A'},
  checkMark: {color: '#FFFFFF', fontSize: 15, fontWeight: '900'},
  checkText: {marginLeft: 12, color: '#DCE6F7', fontSize: 14},
  checkTextDone: {color: '#8FA6CC', textDecorationLine: 'line-through'},
  brief: {marginTop: 24, padding: 20, borderRadius: 24, backgroundColor: '#0F2B50', borderTopWidth: 3, borderTopColor: '#FF7A1A'},
  briefLabel: {color: '#FF8A3D', fontSize: 11, fontWeight: '900', letterSpacing: 1.2},
  briefTitle: {marginTop: 10, color: '#FFFFFF', fontSize: 21, fontWeight: '800'},
  briefMeta: {marginTop: 6, color: '#9FB4D6', fontSize: 13, lineHeight: 18},
  primary: {marginTop: 16, height: 58, borderRadius: 19, backgroundColor: '#2D7CFF', alignItems: 'center', justifyContent: 'center'},
  primaryText: {color: '#FFFFFF', fontSize: 16, fontWeight: '800'},
  clear: {height: 48, alignItems: 'center', justifyContent: 'center'},
  clearText: {color: '#9FB4D6', fontSize: 14, fontWeight: '700'},
});
