import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { logoutUser } from "../../firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";

export default function ProfileScreen() {
  const [name, setName] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;

      if (user) {
        try {
          const snapshot = await getDoc(doc(db, "pokedexUsers", user.uid));

          if (snapshot.exists()) {
            setName(snapshot.data().name);
          }
        } catch (error: any) {
          if (Platform.OS === "web") {
            alert(error.message);
          } else {
            Alert.alert(error.message);
          }
        }
      }
    }

    loadProfile();
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
      router.replace("/login");
    } catch (error: any) {
      if (Platform.OS === "web") {
        alert(error.message);
      } else {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Profile
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{auth.currentUser?.email}</Text>
      </View>

      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#10131B",
  },
  title: {
    color: "#F4F5F8",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1D2330",
    borderRadius: 10,
    padding: 20,
  },
  label: {
    color: "#9CA3B5",
    marginBottom: 5,
  },
  text: {
    color: "#F4F5F8",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
  },
});
