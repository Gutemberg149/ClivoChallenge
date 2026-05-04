import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import categorias from "../../dados/categorias.json";
import subcategoriasData from "../../dados/subcategorias.json";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import doggy from "../../assets/subcategoriaIMG/doggy.png";
import gato from "../../assets/subcategoriaIMG/gato.png";
import peixe from "../../assets/subcategoriaIMG/peixe.png";
import vaca from "../../assets/subcategoriaIMG/vaca.png";
import equino from "../../assets/subcategoriaIMG/equino.png";
import galinha from "../../assets/subcategoriaIMG/galinha.png";
import papagaio from "../../assets/subcategoriaIMG/papagaio.png";
import canario from "../../assets/subcategoriaIMG/canario.png";
import calopsita from "../../assets/subcategoriaIMG/calopsita.png";

const dogIcon = require("../../assets/PNG_ICons/dog.png");
const bullIcon = require("../../assets/PNG_ICons/bull.png");
const pigeonIcon = require("../../assets/PNG_ICons/pigeon.png");

export default function Home({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedSubcategories, setDisplayedSubcategories] = useState([]);

  const [nomeUsuario, setNomeUsuario] = useState("");

  const carregarNomeUsuario = async () => {
    try {
      const nomeSalvo = await AsyncStorage.getItem("@usuario_nome");
      if (nomeSalvo !== null) {
        setNomeUsuario(nomeSalvo);
      } else {
        setNomeUsuario("Visitante");
      }
    } catch (error) {
      console.error("Erro ao carregar o nome:", error);
    }
  };

  const getIcon = (categoriaNome) => {
    switch (categoriaNome) {
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

  const getImagensubcategoria = (subCateID) => {
    switch (subCateID) {
      case "101":
        return doggy;
      case "102":
        return gato;
      case "103":
        return peixe;
      case "104":
        return vaca;
      case "105":
        return equino;
      case "106":
        return galinha;
      case "107":
        return papagaio;
      case "108":
        return canario;
      case "109":
        return calopsita;
      default:
        return dogIcon;
    }
  };

  const handleCategoryPress = (categoriaNome) => {
    setSelectedCategory(categoriaNome);

    let filteredSubcategories = [];

    if (categoriaNome === "Pets") {
      filteredSubcategories = subcategoriasData.subcategorias.filter((sub) => sub.id === 101 || sub.id === 102 || sub.id === 103);
    } else if (categoriaNome === "Agro") {
      filteredSubcategories = subcategoriasData.subcategorias.filter((sub) => sub.id === 104 || sub.id === 105 || sub.id === 106);
    } else if (categoriaNome === "Pássaros") {
      filteredSubcategories = subcategoriasData.subcategorias.filter((sub) => sub.id === 107 || sub.id === 108 || sub.id === 109);
    }

    setDisplayedSubcategories(filteredSubcategories);
  };

  useEffect(() => {
    carregarNomeUsuario();
    handleCategoryPress("Pets");
  }, []);

  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.subcategoryBox}
      onPress={() => navigation.navigate("SubcategoriaListagem", { subcategory: item })} // Alterado aqui
      activeOpacity={0.7}
    >
      <View style={styles.subcategoryCircle}>
        <Image source={getImagensubcategoria(item.id.toString())} style={styles.subcategoryImage} resizeMode="contain" />
      </View>
      <Text style={styles.subcategoryNome}>{item.nome}</Text>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      // Cores do gradiente (podem ser 2 ou mais)
      colors={["#d4fc79", "#96e6a1", "#192f6a"]}
      // Onde o gradiente começa [x, y] (0 a 1)
      start={{ x: 0, y: 0 }}
      // Onde o gradiente termina [x, y]
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.bannerTitle}>
            <Image style={styles.logo} source={require("../../assets/logo/logo2.png")} />
            <Text style={styles.bannerNome}>MedVet</Text>
          </View>

          <View style={styles.userInfo}>
            <Text>
              Olá <Text style={styles.span}>{nomeUsuario || "Carregando..."}</Text>
            </Text>
            <Image style={styles.userImg} source={require("../../assets/userIMG/user.jpeg")} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.categoriasContainerCategoria}>
            {categorias.categorias.map((categoria) => (
              <TouchableOpacity key={categoria.id} style={styles.box} activeOpacity={0.7} onPress={() => handleCategoryPress(categoria.nome)}>
                <View style={[styles.circle, selectedCategory === categoria.nome && { backgroundColor: "#FFE4B5" }]}>
                  <Image source={getIcon(categoria.nome)} style={styles.imagem} resizeMode="contain" />
                </View>
                <Text style={styles.categoriaNome}>{categoria.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedCategory && displayedSubcategories.length > 0 && (
            <View style={styles.subcategoriasContainer}>
              <Text style={styles.subcategoriasTitle}>{selectedCategory} disponíveis</Text>
              <FlatList
                data={displayedSubcategories}
                renderItem={renderSubcategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.subcategoryRow}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  headerContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
    top: 0,
  },

  bannerTitle: {
    width: "50%",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  bannerNome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },

  logo: {
    width: 60,
    height: 60,
  },

  userInfo: {
    width: "50%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  span: {
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
  },

  userImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },

  categoriasContainerCategoria: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  box: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 8,
  },

  selectedCircle: {
    borderColor: "#4a8f7a",
    borderWidth: 3,
    backgroundColor: "#e8f5f0",
  },
  imagem: {
    width: 50,
    height: 50,
  },
  categoriaNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },

  subcategoriasContainer: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
    marginTop: 20,
    overflow: "visible",
  },

  subcategoriasTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a8f7a",
    marginBottom: 15,
    textAlign: "center",
  },

  subcategoryRow: {
    justifyContent: "space-between",
    marginBottom: 15,
  },

  subcategoryBox: {
    width: "49%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    flexDirection: "collum",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "visible",
  },

  subcategoryCircle: {
    width: 85,
    height: 85,
    borderRadius: 40,
    backgroundColor: "#c6eadd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  subcategoryImage: {
    width: 150,
    height: 140,
  },

  subcategoryNome: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    flexShrink: 1,
    width: "100%",
    marginTop: 20,
  },
});
