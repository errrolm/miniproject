import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { auth, db } from "../../firebase/firebaseConfig";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "pokedexUsers", user.uid, "favorites"),
        (snapshot) => {
          const data = [];

          for (let i = 0; i < snapshot.docs.length; i++) {
            data.push(snapshot.docs[i].data());
          }

          setFavorites(data);
        },
      );

      return unsubscribe;
    }
  }, []);

  async function removeFavorite(id: number) {
    const user = auth.currentUser;

    if (user) {
      await deleteDoc(
        doc(db, "pokedexUsers", user.uid, "favorites", id.toString()),
      );

      if (Platform.OS === "web") {
        alert("Removed from favorites");
      } else {
        Alert.alert("Removed from favorites");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        My Favorites
      </Text>

      {favorites.length === 0 && (
        <Text style={styles.subtitle}>No favorite Pokemon yet</Text>
      )}

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.details}>
                <Text variant="titleLarge" style={styles.name}>
                  {item.name}
                </Text>
                <Text style={styles.subtitle}>Pokemon #{item.id}</Text>
                <Text style={styles.text}>Type: {item.types}</Text>
                <Text style={styles.text}>Height: {item.height} m</Text>
                <Text style={styles.text}>Weight: {item.weight} kg</Text>
                <Text style={styles.text}>Abilities: {item.abilities}</Text>
              </View>
            </View>

            <Text variant="titleMedium" style={styles.heading}>
              Description
            </Text>
            <Text style={styles.description}>{item.description}</Text>

            <Button
              mode="outlined"
              onPress={() => removeFavorite(item.id)}
              style={styles.button}
            >
              Remove
            </Button>
          </View>
        )}
      />
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
  subtitle: {
    color: "#9CA3B5",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1D2330",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: "#F4F5F8",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  text: {
    color: "#F4F5F8",
    marginBottom: 5,
  },
  heading: {
    color: "#F4F5F8",
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    lineHeight: 22,
  },
  button: {
    borderRadius: 10,
    marginTop: 15,
  },
});
