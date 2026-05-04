import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SubcategoriaListagem({ route, navigation }) {
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
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    setAnimais(dados ? JSON.parse(dados) : []);
  }

  async function cadastrarAnimal() {
    if (!nome || !idade || !raca) {
      return Alert.alert("Atenção", "Preencha todos os campos do animal.");
    }

    const novoAnimal = {
      id: Date.now().toString(),
      nome,
      idade,
      raca,
      subcategoriaId: subcategory.id,
    };

    const listaAtualizada = [novoAnimal, ...animais];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));

    setNome("");
    setIdade("");
    setRaca("");
    carregarAnimais();
    Alert.alert("Sucesso", `${nome} cadastrado(a)!`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#4a8f7a" />
        </TouchableOpacity>
        <Text style={styles.title}>{subcategory.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Cadastrar Novo</Text>
        <TextInput placeholder="Nome do Animal" style={styles.input} value={nome} onChangeText={setNome} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TextInput placeholder="Idade" style={[styles.input, { flex: 1 }]} value={idade} onChangeText={setIdade} keyboardType="numeric" />
          <TextInput placeholder="Raça" style={[styles.input, { flex: 2 }]} value={raca} onChangeText={setRaca} />
        </View>
        <TouchableOpacity style={styles.btn} onPress={cadastrarAnimal}>
          <Text style={styles.btnText}>ADICIONAR ANIMAL</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>Meus Animais:</Text>
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.animalCard} onPress={() => navigation.navigate("animal", { animal: item, subcategory })}>
            <MaterialCommunityIcons name="paw" size={30} color="#4a8f7a" />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.animalNome}>{item.nome}</Text>
              <Text style={styles.animalInfo}>
                {item.raca} • {item.idade} anos
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum animal cadastrado nesta categoria.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c6eadd" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#4a8f7a" },
  form: { backgroundColor: "#fff", margin: 20, padding: 15, borderRadius: 15, elevation: 5 },
  formTitle: { fontWeight: "bold", marginBottom: 10, color: "#4a8f7a" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginBottom: 10 },
  btn: { backgroundColor: "#4a8f7a", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
  listTitle: { marginLeft: 20, fontSize: 18, fontWeight: "bold", color: "#4a8f7a", marginBottom: 10 },
  animalCard: { backgroundColor: "#fff", padding: 15, borderRadius: 12, flexDirection: "row", alignItems: "center", marginBottom: 10, elevation: 2 },
  animalNome: { fontSize: 18, fontWeight: "bold", color: "#333" },
  animalInfo: { color: "#666", fontSize: 14 },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
});
