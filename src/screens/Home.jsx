import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import categorias from "../../dados/categorias.json";


const dogIcon = require("../../assets/PNG_ICons/dog.png");
const bullIcon = require("../../assets/PNG_ICons/bull.png");
const pigeonIcon = require("../../assets/PNG_ICons/pigeon.png");

export default function Home({ navigation }) {

  const getIcon = (categoriaNome) => {
    switch(categoriaNome) {
      case "Pets":
        return dogIcon;
      case "Agro":
        return bullIcon;
      case "Pássaros":
        return pigeonIcon;
      default:
        return dogIcon;
    }
  };

  return (
    <>
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Home</Text>
        </View>
      </View>
      
      <View style={styles.container}>
        <View style={styles.categoriasContainerCategoria}>
          {categorias.categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              style={styles.box}
              onPress={() =>
                navigation.navigate(categoria.rota, {
                  categoriaId: categoria.id,
                  categoriaNome: categoria.nome,
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.circle}>
              <Image 
                source={getIcon(categoria.nome)} 
                style={styles.imagem}
                resizeMode="contain"
              />
              </View>
             
              <Text style={styles.categoriaNome}>{categoria.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.CarrosselContainer}>
<View style={styles.carrosselBox}></View>
<View style={styles.carrosselBox}></View>
<View style={styles.carrosselBox}></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'relative',
  },
  banner: {
    width: "100%",
    backgroundColor: "white",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6a9b8b",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6a9b8b",
    paddingTop: 20,
  },
  categoriasContainerCategoria: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  box: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    marginBottom: 8,
  },
  imagem: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoriaNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  CarrosselContainer: {
    marginTop: 30,
    width: "100%",
    height: 200,
    // backgroundColor: "white",
    borderRadius: 10,
  },
  carrosselBox:{
    width: 150,
    height: 150,
    backgroundColor: "#6a9b8b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 2,
  }
});