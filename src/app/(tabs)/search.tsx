import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { auth, db } from "../../firebase/firebaseConfig";
import { getPokemonDetails } from "../../services/pokemon";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<any>(null);

  async function searchPokemon() {
    try {
      const data = await getPokemonDetails(query);
      setPokemon(data);
    } catch {
      setPokemon(null);

      if (Platform.OS === "web") {
        alert("Pokemon not found");
      } else {
        Alert.alert("Pokemon not found");
      }
    }
  }

  async function addFavorite() {
    const user = auth.currentUser;

    if (user) {
      await setDoc(
        doc(db, "pokedexUsers", user.uid, "favorites", pokemon.id.toString()),
        pokemon,
      );

      if (Platform.OS === "web") {
        alert("Added to favorites");
      } else {
        Alert.alert("Added to favorites");
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Search Pokemon
      </Text>

      <TextInput
        label="pokemon name"
        mode="outlined"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <Button mode="contained" onPress={searchPokemon} style={styles.button}>
        Search
      </Button>

      {pokemon && (
        <View style={styles.card}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />

          <Text variant="headlineSmall" style={styles.name}>
            {pokemon.name}
          </Text>
          <Text style={styles.subtitle}>Pokemon #{pokemon.id}</Text>

          <Text style={styles.text}>Type: {pokemon.types}</Text>
          <Text style={styles.text}>Height: {pokemon.height} m</Text>
          <Text style={styles.text}>Weight: {pokemon.weight} kg</Text>
          <Text style={styles.text}>Abilities: {pokemon.abilities}</Text>

          <Text variant="titleMedium" style={styles.heading}>
            Description
          </Text>
          <Text style={styles.description}>{pokemon.description}</Text>

          <Button mode="contained" onPress={addFavorite} style={styles.button}>
            add to favorites
          </Button>
        </View>
      )}
    </ScrollView>
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
  input: {
    backgroundColor: "#1D2330",
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#1D2330",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  name: {
    color: "#F4F5F8",
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#9CA3B5",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    color: "#F4F5F8",
    marginBottom: 8,
  },
  heading: {
    color: "#F4F5F8",
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    lineHeight: 22,
  },
});
