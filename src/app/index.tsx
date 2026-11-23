import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text variant="headlineLarge" style={styles.title}>
        Pokedex
      </Text>
      <Text style={styles.subtitle}>search pokemon</Text>
      <ActivityIndicator color="#FFFFFF" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cb2937",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#FFFFFF",
  },
  loader: {
    marginTop: 30,
  },
});
