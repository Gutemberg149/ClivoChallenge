// import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

// export default function Home({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text>Gutemberg Blessed Home</Text>
//       {/* <TouchableOpacity style={styles.loginSquare} onPress={() => navigation.navigate("login")} activeOpacity={0.7}>
//         <Text>Fazer Loginbb</Text>
//       </TouchableOpacity> */}

//       <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("animal")} activeOpacity={0.7}>
//         <Text>Pets</Text>
//       </TouchableOpacity>

        

//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fce8ac",
//   },
//   box: {
//     width: 100,
//     height: 100, 
//     backgroundColor: "#a1c9a2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     elevation: 5, 
//     shadowColor: "#000", 
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
// });
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import categorias from "../../dados/categorias.json";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gutemberg Blessed Home</Text>
      
      <View style={styles.categoriasContainer}>
        {categorias.categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={[styles.box, { backgroundColor: categoria.cor }]}
            onPress={() => navigation.navigate(categoria.rota, { 
              categoriaId: categoria.id,
              categoriaNome: categoria.nome 
            })}
            activeOpacity={0.7}
          >
            <Text style={styles.icone}>{categoria.icone}</Text>
            <Text style={styles.categoriaNome}>{categoria.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: "#a1c9a2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 10,
  },
  icone: {
    fontSize: 40,
    marginBottom: 8,
  },
  categoriaNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});