import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import categorias from "../../dados/categorias.json";
import subcategoriasData from "../../dados/subcategorias.json";

import doggy from "../../assets/subcategoriaIMG/doggy.png";

const dogIcon = require("../../assets/PNG_ICons/dog.png");
const bullIcon = require("../../assets/PNG_ICons/bull.png");
const pigeonIcon = require("../../assets/PNG_ICons/pigeon.png");

export default function Home({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedSubcategories, setDisplayedSubcategories] = useState([]);

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
        return bullIcon;
      case "103":
        return pigeonIcon;
      case "104":
        return pigeonIcon;
      case "105":
        return pigeonIcon;
      case "106":
        return pigeonIcon;
      case "107":
        return pigeonIcon;
      case "108":
        return pigeonIcon;
      case "109":
        return pigeonIcon;
      default:
        return dogIcon;
    }
  };

  // Function to handle category press
  const handleCategoryPress = (categoriaNome) => {
    setSelectedCategory(categoriaNome);

    // Filter subcategories based on selected category
    let filteredSubcategories = [];

    if (categoriaNome === "Pets") {
      filteredSubcategories = subcategoriasData.subcategorias.filter((sub) => sub.id === 101 || sub.id === 102 || sub.id === 103);
    } else if (categoriaNome === "Agro") {
      filteredSubcategories = subcategoriasData.subcategorias.filter((sub) => sub.id === 104 || sub.id === 105 || sub.id === 106);
    } else if (categoriaNome === "Pássaros") {
      // Bird subcategories
      filteredSubcategories = subcategoriasData.subcategorias.filter((sub) => sub.id === 107 || sub.id === 108 || sub.id === 109);
    }

    setDisplayedSubcategories(filteredSubcategories);
  };

  // Load Pets category when app opens
  useEffect(() => {
    handleCategoryPress("Pets");
  }, []);

  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.subcategoryBox} onPress={() => navigation.navigate(item.rota, { subcategory: item })} activeOpacity={0.7}>
      <View style={styles.subcategoryCircle}>
        <Image source={require(`../../assets/PNG_ICons/dog.png`)} style={styles.subcategoryImage} resizeMode="contain" />
      </View>
      <Text style={styles.subcategoryNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Home</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.categoriasContainerCategoria}>
            {categorias.categorias.map((categoria) => (
              <TouchableOpacity key={categoria.id} style={styles.box} activeOpacity={0.7} onPress={() => handleCategoryPress(categoria.nome)}>
                <View style={[styles.circle, selectedCategory === categoria.nome && styles.selectedCircle]}>
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
        <View>
          <Image source={require("../../assets/subcategoriaIMG/doggy.png")} style={styles.dog} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  dog: {
    width: 260,
    height: 280,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#c6eadd",
  },
  bannerContainer: {
    position: "relative",
  },
  banner: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c6eadd",
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#79bca6",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c6eadd",
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    borderColor: "#79bca6",
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
    paddingHorizontal: 20,
    marginTop: 20,
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
    width: "48%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subcategoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#c6eadd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  subcategoryImage: {
    width: 50,
    height: 50,
  },
  subcategoryNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
