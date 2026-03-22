import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, RADII, SPACING } from '../theme';
import { useGatewayStore } from '../store/useGatewayStore';
import { GatewayStatusPill } from './GatewayStatusPill';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export const Header = memo(({ onOpenCommandPalette }: HeaderProps) => {
  const host = useGatewayStore((s) => s.host);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>⊗</Text>
        </View>
        <View>
          <Text style={styles.appName}>CloseClaw</Text>
          <Text style={styles.workspace}>{host}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <GatewayStatusPill />
        <TouchableOpacity style={styles.cmdBtn} onPress={onOpenCommandPalette}>
          <Text style={styles.cmdBtnText}>⌕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

Header.displayName = 'Header';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: RADII.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    color: COLORS.background,
    fontWeight: '900',
  },
  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    letterSpacing: 0.5,
  },
  workspace: {
    fontSize: 12,
    color: COLORS.text.secondary,
    letterSpacing: 0.5,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  cmdBtn: {
    width: 36,
    height: 36,
    borderRadius: RADII.sm,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cmdBtnText: {
    fontSize: 18,
    color: COLORS.text.secondary,
  },
});