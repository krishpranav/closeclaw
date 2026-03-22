import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme";

interface MainContainerProps {
    children: React.ReactNode;
    withGradient?: boolean;
}

export const MainContainer = memo(({ children, withGradient = false }: MainContainerProps) => {
    return (
        <View style={styles.root}>
            <StatusBar style="light" backgroundColor={COLORS.black} />
            {withGradient && (
                <LinearGradient
                    colors={["#0D1A00", "#000000"]}
                    style={StyleSheet.absoluteFillObject}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            )}
            <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
                {children}
            </SafeAreaView>
        </View>
    );
});

MainContainer.displayName = "MainContainer";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    safe: {
        flex: 1,
    },
});