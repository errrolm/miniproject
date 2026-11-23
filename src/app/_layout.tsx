import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#E63946",
    onPrimary: "#FFFFFF",
    background: "#10131B",
    surface: "#1D2330",
    onSurface: "#F4F5F8",
    onBackground: "#F4F5F8",
    onSurfaceVariant: "#9CA3B5",
    outline: "#687083",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}
