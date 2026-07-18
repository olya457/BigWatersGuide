import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLaunchFlow() {
  const [loading, setLoading] = useState(true);

  const [firstLaunch, setFirstLaunch] = useState(true);

  useEffect(() => {
    check();
  }, []);

  async function check() {
    const value = await AsyncStorage.getItem('river_first_launch');

    if (value) {
      setFirstLaunch(false);
    }

    setLoading(false);
  }

  return {
    loading,
    firstLaunch,
  };
}
