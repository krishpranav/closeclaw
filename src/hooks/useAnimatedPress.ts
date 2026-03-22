import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export function useAnimatedPress(scaleFactor = 0.96) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(scaleFactor, {
      mass: 0.5,
      damping: 12,
      stiffness: 150,
    });
  }, [scale, scaleFactor]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, {
      mass: 0.5,
      damping: 12,
      stiffness: 150,
    });
  }, [scale]);

  return { animatedStyle, onPressIn, onPressOut };
}