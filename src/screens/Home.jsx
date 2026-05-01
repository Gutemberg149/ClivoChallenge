import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Gutemberg Blessed Home</Text>
      <TouchableOpacity
        style={styles.loginSquare}
        onPress={() => navigation.navigate("login")}
        activeOpacity={0.7} // Efeito ao clicar (opcional)
      >
        <Text>Fazer Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.animalSquare} onPress={() => navigation.navigate("animal")} activeOpacity={0.7}>
        <Text>Animal</Text>
      </TouchableOpacity>
      {/*
            <Button 
                title="Serviços"
                onPress={()=>navigation.navigate("servicos")}
            /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fce8ac",
  },
  loginSquare: {
    width: 200, // Largura do quadrado
    height: 200, // Altura do quadrado (mesmo valor = quadrado)
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Bordas arredondadas (opcional)
    elevation: 5, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
