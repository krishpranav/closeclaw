import React, { memo } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS, RADII, SPACING } from '../theme';
import { useAnimatedPress } from '../hooks/useAnimatedPress';

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
  accentColor?: string;
  badge?: number | string;
  danger?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ActionCard = memo(
  ({
    title,
    subtitle,
    icon,
    onPress,
    accentColor = COLORS.primary,
    badge,
    danger,
  }: ActionCardProps) => {
    const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();

    return (
      <AnimatedPressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={[styles.container, animatedStyle]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, danger && { color: COLORS.danger }]}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {badge !== undefined && (
          <View style={[styles.badge, { backgroundColor: accentColor }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </AnimatedPressable>
    );
  }
);

ActionCard.displayName = 'ActionCard';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.pill,
    marginLeft: SPACING.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.background,
  },
});