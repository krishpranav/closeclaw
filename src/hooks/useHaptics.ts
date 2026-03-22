import * as Haptics from "expo-haptics";
import { useCallback } from "react";

export const useHaptics = () => {
    const light = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, []);
}