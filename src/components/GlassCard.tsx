import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS, RADII, SPACING } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accentColor?: string;
  accentTop?: boolean;
}

export const GlassCard = memo(
  ({ children, style, accentColor, accentTop }: GlassCardProps) => {
    return (
      <View
        style={[
          styles.card,
          accentTop && accentColor
            ? { borderTopWidth: 2, borderTopColor: accentColor }
            : null,
          style,
        ]}
      >
        {children}
      </View>
    );
  }
);

GlassCard.displayName = 'GlassCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
});