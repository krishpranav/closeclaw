import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = memo(({ children }: MainContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          // Bottom padding handled by Tab navigator usually, but if needed:
          // paddingBottom: Math.max(insets.bottom, 16) 
        },
      ]}
    >
      {children}
    </View>
  );
});

MainContainer.displayName = 'MainContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});