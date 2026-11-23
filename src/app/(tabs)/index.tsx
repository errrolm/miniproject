import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { auth, db } from "../../firebase/firebaseConfig";
import { getPokemonList } from "../../services/pokemon";

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPokemon() {
    try {
      const data = await getPokemonList();
      setPokemon(data);
    } catch {
      if (Platform.OS === "web") {
        alert("Failed to load Pokemon");
      } else {
        Alert.alert("Failed to load Pokemon");
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  async function addFavorite(item: any) {
    const user = auth.currentUser;

    if (user) {
      await setDoc(
        doc(db, "pokedexUsers", user.uid, "favorites", item.id.toString()),
        item,
      );

      if (Platform.OS === "web") {
        alert("Added to favorites");
      } else {
        Alert.alert("Added to favorites");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Pokedex
      </Text>

      {loading && <ActivityIndicator />}

      <FlatList
        data={pokemon}
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
              mode="contained"
              onPress={() => addFavorite(item)}
              style={styles.button}
            >
              add to favorites
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
    marginBottom: 5,
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
