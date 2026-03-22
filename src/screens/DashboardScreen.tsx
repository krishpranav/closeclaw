import React, { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MainContainer } from '../components/MainContainer';
import { Header } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { ActionCard } from '../components/ActionCard';
import { CommandPalette } from '../components/CommandPalette';
import { useGatewayStore } from '../store/useGatewayStore';
import { COLORS, RADII, SPACING } from '../theme';

export const DashboardScreen = memo(() => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const agents = useGatewayStore((s) => s.agents);
  const channels = useGatewayStore((s) => s.channels);
  const sessions = useGatewayStore((s) => s.sessions);
  const tools = useGatewayStore((s) => s.tools);
  const logs = useGatewayStore((s) => s.logs);

  const activeAgents = agents.filter((a) => a.activeSessions > 0).length;
  const connectedChannels = channels.filter((c) => c.status === 'connected').length;
  const openSessions = sessions.length;

  const onOpenPalette = useCallback(() => setPaletteOpen(true), []);

  const ListHeader = () => (
    <View style={styles.content}>
      {/* Stats Row */}
      <View style={styles.statsRow}>
        <GlassCard style={styles.statCard} accentColor={COLORS.primary} accentTop>
          <Text style={styles.statNum}>{activeAgents}</Text>
          <Text style={styles.statLabel}>ACTIVE AGENTS</Text>
        </GlassCard>
        <GlassCard style={styles.statCard} accentColor={COLORS.info} accentTop>
          <Text style={[styles.statNum, { color: COLORS.info }]}>{connectedChannels}</Text>
          <Text style={styles.statLabel}>CHANNELS</Text>
        </GlassCard>
        <GlassCard style={styles.statCard} accentColor={COLORS.danger} accentTop>
          <Text style={[styles.statNum, { color: COLORS.danger }]}>{openSessions}</Text>
          <Text style={styles.statLabel}>SESSIONS</Text>
        </GlassCard>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
      <ActionCard
        icon="💬"
        title="New Chat Session"
        subtitle="Start a new message thread"
        accentColor={COLORS.primary}
        onPress={() => console.log('New Chat')}
      />
      <ActionCard
        icon="⚡"
        title="Run Tool"
        subtitle="Manually trigger a script or node"
        accentColor={COLORS.info}
        onPress={() => console.log('Run Tool')}
      />

      {/* Active Right Now */}
      <Text style={styles.sectionTitle}>ACTIVE RIGHT NOW</Text>
      <View style={{ minHeight: 120 }}>
        {tools.filter((t) => t.status === 'running').length === 0 ? (
          <GlassCard style={{ padding: SPACING.md }}>
            <Text style={{ color: COLORS.text.secondary }}>No tools or cron jobs running.</Text>
          </GlassCard>
        ) : (
          <FlashList
            data={tools.filter((t) => t.status === 'running')}
            renderItem={({ item }) => (
              <GlassCard style={{ marginBottom: SPACING.sm, flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                <Text style={{ color: COLORS.text.primary, marginLeft: SPACING.sm }}>
                  {item.toolName}
                </Text>
                <Text style={{ color: COLORS.text.secondary, marginLeft: 'auto', fontSize: 12 }}>
                  {item.startedAt}
                </Text>
              </GlassCard>
            )}
          />
        )}
      </View>
    </View>
  );

  return (
    <MainContainer>
      <Header onOpenCommandPalette={onOpenPalette} />

      <FlashList
        ListHeaderComponent={ListHeader}
        data={[]}
        renderItem={({ item }) => null}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Live Console Strip */}
      <View style={styles.consoleStrip}>
        {logs.slice(0, 3).map((log) => (
          <Text key={log.id} style={styles.consoleText} numberOfLines={1}>
            <Text style={{ color: log.level === 'error' ? COLORS.danger : COLORS.primary }}>
              {`[${log.level.toUpperCase()}] `}
            </Text>
            {log.message}
          </Text>
        ))}
      </View>

      <CommandPalette visible={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </MainContainer>
  );
});

DashboardScreen.displayName = 'DashboardScreen';

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statNum: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.text.dim,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text.dim,
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  consoleStrip: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SPACING.sm,
  },
  consoleText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
});