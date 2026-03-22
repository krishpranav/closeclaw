import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, RADII, SPACING } from '../theme';

interface CommandPaletteProps {
  visible: boolean;
  onClose: () => void;
}

export const CommandPalette = memo(({ visible, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');

  // Dummy commands for Phase 2 UI test
  const commands = [
    { id: '1', title: 'Start Nmap Scan', subtitle: 'Tools' },
    { id: '2', title: 'Open OmniClaw Workspace', subtitle: 'Agents' },
    { id: '3', title: 'Configure Telegram', subtitle: 'Channels' },
  ].filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.palette} onPress={(e) => e.stopPropagation()}>
            <View style={styles.searchRow}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                style={styles.input}
                placeholder="Search commands, agents, files..."
                placeholderTextColor={COLORS.text.dim}
                autoFocus
                value={query}
                onChangeText={setQuery}
              />
            </View>
            
            <FlatList
              data={commands}
              keyboardShouldPersistTaps="handled"
              keyExtractor={item => item.id}
              contentContainerStyle={{ padding: SPACING.md }}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
              )}
            />
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
});

CommandPalette.displayName = 'CommandPalette';

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 80,
    alignItems: 'center',
  },
  palette: {
    width: '90%',
    maxHeight: '60%',
    backgroundColor: COLORS.card,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    overflow: 'hidden',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 60,
  },
  searchIcon: {
    fontSize: 20,
    color: COLORS.primary,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.text.primary,
    fontSize: 16,
    height: '100%',
  },
  item: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemTitle: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: COLORS.text.secondary,
    fontSize: 12,
    marginTop: 2,
  },
});