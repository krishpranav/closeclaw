import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { COLORS, RADII, SPACING } from '../theme';
import { useGatewayStore } from '../store/useGatewayStore';

export const GatewayStatusPill = memo(() => {
  const status = useGatewayStore((s) => s.status);
  const latency = useGatewayStore((s) => s.latency);

  const dotOpacity = useSharedValue(1);

  useEffect(() => {
    if (status === 'live' || status === 'connecting') {
      dotOpacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      dotOpacity.value = 1;
    }
  }, [status, dotOpacity]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
  }));

  const getStatusColor = () => {
    switch (status) {
      case 'live':
        return COLORS.primary; // Neon Lime
      case 'connecting':
        return COLORS.info;    // Neon Blue
      case 'offline':
      case 'error':
        return COLORS.danger;  // Neon Rose
      default:
        return COLORS.text.dim;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live':
        return latency > 0 ? `${latency}ms` : 'LIVE';
      case 'connecting':
        return 'CONNECTING';
      case 'offline':
        return 'OFFLINE';
      case 'error':
        return 'ERROR';
      default:
        return 'UNKNOWN';
    }
  };

  const statusColor = getStatusColor();

  return (
    <View style={styles.pillContainer}>
      <Animated.View
        style={[styles.dot, animatedDotStyle, { backgroundColor: statusColor }]}
      />
      <Text style={[styles.statusText, { color: statusColor }]}>
        {getStatusText()}
      </Text>
    </View>
  );
});

GatewayStatusPill.displayName = 'GatewayStatusPill';

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
