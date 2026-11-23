import { router } from "expo-router";
import { useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { loginUser } from "../firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      if (Platform.OS === "web") {
        alert("Please fill all fields");
      } else {
        Alert.alert("Please fill all fields");
      }

      return;
    }

    setLoading(true);

    try {
      await loginUser(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      if (Platform.OS === "web") {
        alert(error.message);
      } else {
        Alert.alert(error.message);
      }
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Pokedex
      </Text>
      <Text style={styles.subtitle}>Login to account</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Login
      </Button>

      <Button onPress={() => router.push("/register")}>
        Create an Account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#10131B",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#F4F5F8",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#9CA3B5",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#1D2330",
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
