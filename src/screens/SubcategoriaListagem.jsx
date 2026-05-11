import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext"; 

export default function SubcategoriaListagem({ route, navigation }) {
  const { colors, dark } = useTheme();
  const { subcategory } = route.params;
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");
  const [animais, setAnimais] = useState([]);

  const STORAGE_KEY = `@animais_${subcategory.id}`;

  useEffect(() => {
    carregarAnimais();
  }, []);

  async function carregarAnimais() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      setAnimais(dados ? JSON.parse(dados) : []);
    } catch (e) {
      console.error("Erro ao carregar animais", e);
    }
  }

  async function cadastrarAnimal() {
    if (!nome.trim() || !idade.trim() || !raca.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos do animal.");
    }

    const novoAnimal = {
      id: Date.now().toString(),
      nome: nome.trim(),
      idade: idade.trim(),
      raca: raca.trim(),
      subcategoriaId: subcategory.id,
    };

    const listaAtualizada = [novoAnimal, ...animais];

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
      setNome("");
      setIdade("");
      setRaca("");
      carregarAnimais();
      Alert.alert("Sucesso", `${novoAnimal.nome} cadastrado(a)!`);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar o animal.");
    }
  }

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Dinâmico */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons name="arrow-left" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>{subcategory.nome}</Text>
          <View style={{ width: 42 }} />
        </View>

      
        <View style={[styles.form, { backgroundColor: colors.card }]}>
          <Text style={[styles.formTitle, { color: colors.primary }]}>CADASTRAR NOVO</Text>

          <TextInput
            placeholder="Nome do Animal"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#fafafa",
                color: colors.text,
                borderColor: dark ? "#444" : "#ddd",
              },
            ]}
            value={nome}
            onChangeText={setNome}
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
            <TextInput
              placeholder="Idade"
              placeholderTextColor={dark ? "#999" : "#666"}
              style={[
                styles.input,
                {
                  flex: 1,
                  backgroundColor: dark ? "#333" : "#fafafa",
                  color: colors.text,
                  borderColor: dark ? "#444" : "#ddd",
                },
              ]}
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Raça"
              placeholderTextColor={dark ? "#999" : "#666"}
              style={[
                styles.input,
                {
                  flex: 2,
                  backgroundColor: dark ? "#333" : "#fafafa",
                  color: colors.text,
                  borderColor: dark ? "#444" : "#ddd",
                },
              ]}
              value={raca}
              onChangeText={setRaca}
            />
          </View>

          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={cadastrarAnimal}>
            <Text style={styles.btnText}>ADICIONAR ANIMAL</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.listTitle, { color: colors.text }]}>MEUS ANIMAIS:</Text>

        <FlatList
          data={animais}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.animalCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate("animal", { animal: item, subcategory })}
            >
              <View style={[styles.iconCircle, { backgroundColor: dark ? "#1b2e26" : "#e8f5f0" }]}>
                <MaterialCommunityIcons name="paw" size={26} color={colors.primary} />
              </View>

              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={[styles.animalNome, { color: colors.text }]}>{item.nome}</Text>
                <Text style={[styles.animalInfo, { color: colors.subText }]}>
                  {item.raca} • {item.idade} {parseInt(item.idade) === 1 ? "ano" : "anos"}
                </Text>
              </View>

              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.subText} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: colors.subText }]}>Nenhum animal cadastrado nesta categoria.</Text>}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  backBtn: { padding: 8, borderRadius: 12 },
  title: { fontSize: 20, fontWeight: "bold" },
  form: {
    margin: 20,
    padding: 20,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  formTitle: { fontWeight: "bold", marginBottom: 15, textAlign: "center", letterSpacing: 1 },
  input: {
    borderWidth: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  listTitle: { marginLeft: 25, fontSize: 14, fontWeight: "bold", marginBottom: 15, opacity: 0.8 },
  animalCard: {
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  animalNome: { fontSize: 18, fontWeight: "bold" },
  animalInfo: { fontSize: 14, marginTop: 2 },
  empty: { textAlign: "center", marginTop: 40, fontSize: 15 },
});
