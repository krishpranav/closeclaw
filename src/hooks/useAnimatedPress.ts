import { useCallback } from "react";
import {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export const useAnimatedPress = (scaleTo = 0.96) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const onPressIn = useCallback(() => {
        scale.value = withSpring(scaleTo, { damping: 15, stiffness: 400 });
        opacity.value = withTiming(0.85, { duration: 80 });
    }, [scaleTo]);

    const onPressOut = useCallback(() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
        opacity.value = withTiming(1, { duration: 120 });
    }, []);

    return { animatedStyle, onPressIn, onPressOut };
};