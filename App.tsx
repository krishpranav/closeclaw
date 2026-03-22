import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DashboardScreen } from './src/screens/DashboardScreen';
import { SessionsScreen as ChatScreen } from './src/screens/SessionsScreen';
import { AgentsScreen } from './src/screens/AgentsScreen';
import { ChannelsScreen } from './src/screens/ChannelsScreen';
import { ToolsScreen } from './src/screens/ToolsScreen';
import { SkillsScreen } from './src/screens/SkillsScreen';

import { COLORS } from './src/theme';

const Tab = createBottomTabNavigator();

const DARK_NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: COLORS.surface,
    border: COLORS.border,
    text: COLORS.text.primary,
    primary: COLORS.primary,
  },
};

const TAB_ICONS: Record<string, string> = {
  Dashboard: '⊗',
  Chat: '💬',
  Agents: '🤖',
  Channels: '📡',
  Tools: '⚡',
  Skills: '🧩',
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={DARK_NAV_THEME}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.text.dim,
              tabBarLabelStyle: styles.tabLabel,
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 18, color }}>
                  {TAB_ICONS[route.name]}
                </Text>
              ),
            })}
          >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Agents" component={AgentsScreen} />
            <Tab.Screen name="Channels" component={ChannelsScreen} />
            <Tab.Screen name="Tools" component={ToolsScreen} />
            <Tab.Screen name="Skills" component={SkillsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 6,
    paddingTop: 6,
    height: 62,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});