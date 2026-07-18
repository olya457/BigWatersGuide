import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fishingLocations from '../../database/fishingLocations';

type FieldNote = {id: string; text: string; createdAt: string};

export default function FieldLogScreen() {
  const navigation = useNavigation<any>();
  const [notes, setNotes] = useState<FieldNote[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const noteInput = useRef<TextInput>(null);

  const load = useCallback(() => {
    Promise.all([
      AsyncStorage.getItem('field_notes'),
      AsyncStorage.getItem('saved_places'),
    ]).then(values => {
      setNotes(values[0] ? JSON.parse(values[0]) : []);
      setSavedIds(values[1] ? JSON.parse(values[1]) : []);
    });
  }, []);

  useFocusEffect(load);

  async function addNote() {
    const text = draft.trim();
    if (!text) {
      return;
    }
    const next = [
      {id: `${Date.now()}`, text, createdAt: new Date().toISOString()},
      ...notes,
    ];
    setNotes(next);
    setDraft('');
    await AsyncStorage.setItem('field_notes', JSON.stringify(next));
  }

  async function removeNote(id: string) {
    const next = notes.filter(note => note.id !== id);
    setNotes(next);
    await AsyncStorage.setItem('field_notes', JSON.stringify(next));
  }

  const saved = fishingLocations.filter(place => savedIds.includes(place.id));

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={8}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>PERSONAL FIELD LOG</Text>
        <Text style={styles.title}>Keep what matters.</Text>
        <Text style={styles.intro}>
          Saved waters and quick observations live together, on this device.
        </Text>

        <Pressable
          style={styles.composer}
          onPress={() => noteInput.current?.focus()}>
          <TextInput
            ref={noteInput}
            value={draft}
            onChangeText={setDraft}
            placeholder="What did you notice today?"
            placeholderTextColor="#7186AA"
            multiline
            maxLength={280}
            returnKeyType="default"
            style={styles.input}
          />
          <View style={styles.composerBottom}>
            <Text style={styles.counter}>{draft.length}/280</Text>
            <TouchableOpacity style={styles.add} onPress={addNote}>
              <Text style={styles.addText}>Add note</Text>
            </TouchableOpacity>
          </View>
        </Pressable>

        <Section title="Saved waters" count={saved.length} />
        {saved.length ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {saved.map(place => (
              <TouchableOpacity
                key={place.id}
                style={styles.savedCard}
                onPress={() => navigation.navigate('PlaceView', {place})}>
                <Text style={styles.savedTitle}>{place.title}</Text>
                <Text style={styles.savedMeta}>
                  {place.distance} · {place.bestTime}
                </Text>
                <Text style={styles.open}>Open field card  ›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <TouchableOpacity
            style={styles.empty}
            onPress={() => navigation.navigate('WaterAtlas')}>
            <Text style={styles.emptyTitle}>No waters pinned yet</Text>
            <Text style={styles.emptyText}>
              Browse the atlas and pin places you want to remember.
            </Text>
          </TouchableOpacity>
        )}

        <Section title="Recent observations" count={notes.length} />
        {notes.length ? (
          notes.map(note => (
            <View key={note.id} style={styles.note}>
              <View style={styles.noteHead}>
                <Text style={styles.noteDate}>
                  {new Date(note.createdAt).toLocaleDateString('en', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Delete note?', undefined, [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => removeNote(note.id),
                      },
                    ])
                  }>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.noteText}>{note.text}</Text>
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>A clean page</Text>
            <Text style={styles.emptyText}>
              Add a condition, catch, route detail or something to revisit.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Section({title, count}: {title: string; count: number}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.count}>{count.toString().padStart(2, '0')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#071B3F'},
  content: {paddingTop: 62, paddingHorizontal: 20, paddingBottom: 125},
  kicker: {color: '#FF8A3D', fontSize: 12, fontWeight: '900', letterSpacing: 1.8},
  title: {marginTop: 9, color: '#FFFFFF', fontSize: 34, fontWeight: '800'},
  intro: {marginTop: 10, color: '#9FB4D6', fontSize: 15, lineHeight: 22},
  composer: {marginTop: 25, padding: 16, borderRadius: 24, backgroundColor: '#0F2B50', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)'},
  input: {minHeight: 82, padding: 0, color: '#FFFFFF', fontSize: 16, lineHeight: 23, textAlignVertical: 'top'},
  composerBottom: {marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  counter: {color: '#7186AA', fontSize: 12},
  add: {height: 40, paddingHorizontal: 18, borderRadius: 14, backgroundColor: '#2D7CFF', alignItems: 'center', justifyContent: 'center'},
  addText: {color: '#FFFFFF', fontSize: 14, fontWeight: '800'},
  section: {marginTop: 30, marginBottom: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  sectionTitle: {color: '#FFFFFF', fontSize: 20, fontWeight: '800'},
  count: {color: '#7FB0FF', fontSize: 12, fontWeight: '900', letterSpacing: 1},
  savedCard: {width: 235, minHeight: 135, marginRight: 11, padding: 18, borderRadius: 23, backgroundColor: '#2D7CFF'},
  savedTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  savedMeta: {marginTop: 8, color: '#D8E5FF', fontSize: 12, lineHeight: 17},
  open: {marginTop: 'auto', color: '#FFFFFF', fontSize: 13, fontWeight: '800'},
  note: {marginBottom: 12, padding: 18, borderRadius: 22, backgroundColor: '#0F2B50'},
  noteHead: {flexDirection: 'row', justifyContent: 'space-between'},
  noteDate: {color: '#7FB0FF', fontSize: 11, fontWeight: '900', letterSpacing: 1},
  delete: {color: '#9FB4D6', fontSize: 12, fontWeight: '700'},
  noteText: {marginTop: 12, color: '#DCE6F7', fontSize: 15, lineHeight: 23},
  empty: {padding: 20, borderRadius: 22, backgroundColor: '#0F2B50', borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.15)'},
  emptyTitle: {color: '#FFFFFF', fontSize: 17, fontWeight: '800'},
  emptyText: {marginTop: 6, color: '#8FA6CC', fontSize: 14, lineHeight: 20},
});
