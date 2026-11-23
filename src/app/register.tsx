import { router } from "expo-router";
import { useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { registerUser } from "../firebase/auth";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      if (Platform.OS === "web") {
        alert("Please fill all fields");
      } else {
        Alert.alert("Please fill all fields");
      }

      return;
    }

    if (password.length < 6) {
      if (Platform.OS === "web") {
        alert("Password must contain at least 6 characters");
      } else {
        Alert.alert("Password must contain at least 6 characters");
      }

      return;
    }

    setLoading(true);

    try {
      await registerUser(name, email, password);
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
        Register
      </Text>
      <Text style={styles.subtitle}>Create your Pokedex account</Text>

      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

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
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Register
      </Button>

      <Button onPress={() => router.replace("/login")}>
        Already have an account? Login
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
