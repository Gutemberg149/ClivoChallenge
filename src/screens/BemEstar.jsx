import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BemEstar({ route, navigation }) {
  const { subcategory } = route.params || {};
  const [atividade, setAtividade] = useState("");
  const [obs, setObs] = useState("");
  const [listaBemEstar, setListaBemEstar] = useState([]);

  const STORAGE_KEY = `@bemestar_${subcategory?.id || "ROTINA"}`;

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    setListaBemEstar(dados ? JSON.parse(dados) : []);
  }

  async function salvar() {
    if (!atividade || !obs) return Alert.alert("Erro", "Preencha a atividade e observação.");

    const novaLista = [{ atividade, obs, id: Date.now().toString() }, ...listaBemEstar];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    setAtividade("");
    setObs("");
    buscarDados();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#4a8f7a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bem-Estar: {subcategory?.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <TextInput placeholder="Atividade (ex: Passeio, Ração específica)" style={styles.input} value={atividade} onChangeText={setAtividade} />
        <TextInput placeholder="Observações (ex: Comeu bem, correu 20min)" style={styles.input} value={obs} onChangeText={setObs} />
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#FF9800" }]} onPress={salvar}>
          <Text style={styles.btnText}>REGISTRAR ROTINA</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaBemEstar}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <MaterialCommunityIcons name="heart-pulse" size={24} color="#FF9800" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardNome}>{item.atividade}</Text>
              <Text style={styles.cardSub}>{item.obs}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF9F2" }, // Fundo creme/laranja claro
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#E67E22" },
  form: {
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFE0B2",
  },
  input: {
    backgroundColor: "#FFFBF5",
    borderWidth: 1,
    borderColor: "#FFCC80",
    height: 48,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#FF9800",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF9800",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: { color: "white", fontWeight: "900", fontSize: 16, textTransform: "uppercase" },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderBottomWidth: 4,
    borderBottomColor: "#FFCC80",
  },
  cardNome: { fontSize: 18, fontWeight: "700", color: "#444" },
  cardSub: { fontSize: 14, color: "#777", fontStyle: "italic" },
});
