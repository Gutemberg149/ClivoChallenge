import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Terapeutico({ route, navigation }) {
  const { subcategory } = route.params || {};
  const [remedio, setRemedio] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [horario, setHorario] = useState("");
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [editando, setEditando] = useState(null);

  const STORAGE_KEY = `@terapeutico_${subcategory?.id || "MEDS"}`;

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    setListaMedicamentos(dados ? JSON.parse(dados) : []);
  }

  async function salvar() {
    if (!remedio || !dosagem || !horario) {
      Alert.alert("Erro", "Preencha o remédio, a dose e o horário.");
      return;
    }

    let meds = [...listaMedicamentos];
    const novoMed = { remedio, dosagem, horario };

    if (editando !== null) {
      meds[editando.index] = novoMed;
    } else {
      meds.push(novoMed);
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
    setRemedio("");
    setDosagem("");
    setHorario("");
    setEditando(null);
    buscarDados();
  }

  async function deletar(index) {
    const novaLista = listaMedicamentos.filter((_, i) => i !== index);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    buscarDados();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#4a8f7a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terapêutico: {subcategory?.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <TextInput placeholder="Nome do Medicamento" style={styles.input} value={remedio} onChangeText={setRemedio} />
        <TextInput placeholder="Dosagem (ex: 5mg ou 2 gotas)" style={styles.input} value={dosagem} onChangeText={setDosagem} />
        <TextInput placeholder="Horário (ex: 08:00 / 20:00)" style={styles.input} value={horario} onChangeText={setHorario} />
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#F44336" }]} onPress={salvar}>
          <Text style={styles.btnText}>{editando ? "ATUALIZAR" : "SALVAR MEDICAMENTO"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaMedicamentos}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <MaterialCommunityIcons name="pill" size={24} color="#F44336" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardNome}>{item.remedio}</Text>
              <Text style={styles.cardSub}>
                {item.dosagem} às {item.horario}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deletar(index)}>
              <MaterialCommunityIcons name="delete" size={22} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5F5" }, // Fundo levemente rosado/claro
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#FFEBEB",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#D32F2F", letterSpacing: 0.5 },
  form: {
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#F44336",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#FEE2E2",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#FFF",
    color: "#333",
  },
  btn: {
    backgroundColor: "#F44336",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 15,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#F44336",
    elevation: 3,
  },
  cardNome: { fontSize: 17, fontWeight: "bold", color: "#1a1a1a" },
  cardSub: { fontSize: 14, color: "#666", marginTop: 2 },
});
