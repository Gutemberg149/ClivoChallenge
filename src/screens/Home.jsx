import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext.js";

import categorias from "../../dados/categorias.json";
import subcategoriasData from "../../dados/subcategorias.json";

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
  const { colors, dark, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Pets");
  const [displayedSubcategories, setDisplayedSubcategories] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    carregarNomeUsuario();
    handleCategoryPress("Pets");
  }, []);

  const carregarNomeUsuario = async () => {
    try {
      const nomeSalvo = await AsyncStorage.getItem("@usuario_nome");
      setNomeUsuario(nomeSalvo || "Visitante");
    } catch (e) {
      console.error(e);
    }
  };

  const getIcon = (cat) => {
    if (cat === "Pets") return dogIcon;
    if (cat === "Agro") return bullIcon;
    return pigeonIcon;
  };

  const getImagensubcategoria = (id) => {
    const images = {
      101: doggy,
      102: gato,
      103: peixe,
      104: vaca,
      105: equino,
      106: galinha,
      107: papagaio,
      108: canario,
      109: calopsita,
    };
    return images[id] || dogIcon;
  };

  const handleCategoryPress = (nome) => {
    setSelectedCategory(nome);
    const range = nome === "Pets" ? [101, 103] : nome === "Agro" ? [104, 106] : [107, 109];
    const filtered = subcategoriasData.subcategorias.filter((s) => s.id >= range[0] && s.id <= range[1]);
    setDisplayedSubcategories(filtered);
  };

  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.subcategoryBox, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate("SubcategoriaListagem", { subcategory: item })}
    >
      <View style={[styles.subcategoryCircle, { backgroundColor: colors.iconBg }]}>
        <Image source={getImagensubcategoria(item.id.toString())} style={styles.subcategoryImage} resizeMode="contain" />
      </View>
      <Text style={[styles.subcategoryNome, { color: colors.text }]}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.headerContainer, { backgroundColor: colors.card }]}>
            <View style={styles.headerTop}>
              <View style={styles.bannerTitle}>
                <Image style={styles.logo} source={require("../../assets/logo/logo2.png")} />
                <Text style={[styles.bannerNome, { color: colors.text }]}>MedVet</Text>
              </View>
              <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                <Ionicons name={dark ? "sunny" : "moon"} size={26} color={dark ? "#FFD700" : "#444"} />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <View>
                <Text style={[styles.welcomeText, { color: colors.subText }]}>Olá,</Text>
                <Text style={[styles.userName, { color: colors.text }]}>{nomeUsuario}</Text>
              </View>
              <Image style={styles.userImg} source={require("../../assets/userIMG/user.jpeg")} />
            </View>
          </View>

          {/* CATEGORIAS */}
          <View style={styles.content}>
            <View style={styles.categoriesRow}>
              {categorias.categorias.map((categoria) => (
                <TouchableOpacity key={categoria.id} onPress={() => handleCategoryPress(categoria.nome)} style={styles.categoryItem}>
                  <View
                    style={[styles.circle, { backgroundColor: colors.card, borderColor: selectedCategory === categoria.nome ? colors.primary : "transparent" }]}
                  >
                    <Image source={getIcon(categoria.nome)} style={styles.imagem} resizeMode="contain" />
                  </View>
                  <Text style={[styles.categoriaNome, { color: colors.text, fontWeight: selectedCategory === categoria.nome ? "700" : "400" }]}>
                    {categoria.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SUBCATEGORIAS */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{selectedCategory} disponíveis</Text>
            <FlatList
              data={displayedSubcategories}
              renderItem={renderSubcategoryItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerTitle: { flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40, marginRight: 10 },
  bannerNome: { fontSize: 22, fontWeight: "800" },
  themeToggle: { padding: 8, borderRadius: 12, backgroundColor: "rgba(150,150,150,0.1)" },
  userInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  welcomeText: { fontSize: 16 },
  userName: { fontSize: 20, fontWeight: "bold" },
  userImg: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "#4CAF50" },

  content: { paddingHorizontal: 20 },
  categoriesRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 25 },
  categoryItem: { alignItems: "center" },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginBottom: 8,
    elevation: 4,
  },
  imagem: { width: 35, height: 35 },
  categoriaNome: { fontSize: 12 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, marginLeft: 5 },
  row: { justifyContent: "space-between" },
  subcategoryBox: {
    width: "48%",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  subcategoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  subcategoryImage: { width: 80, height: 80, position: "absolute", top: -10 },
  subcategoryNome: { marginTop: 45, fontSize: 16, fontWeight: "600" },
});
