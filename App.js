import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";

export default function App() {
  const [games, setGames] = useState([]);

  const getGames = async () => {
    const url = `https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apikey=1MOZgmNFxvm1jaQRIX9KAij9M04xAY3u"`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data);
    setGames(data.data);
  };

  useEffect(() => {
    getGames();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {games.map((game) => (
        <View key={game.slug} style={styles.card}>
          <Image source={{ uri: game.image }} style={styles.image} />
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.description}>{game.description}</Text>
          <Text style={styles.score}>{game.criticScoreSummary.score}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginBottom: 42,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#eee",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
