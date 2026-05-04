import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BemEstar({ route, navigation }) {
  const { animal, subcategory } = route.params || {};
  const [atividade, setAtividade] = useState("");
  const [obs, setObs] = useState("");
  const [listaBemEstar, setListaBemEstar] = useState([]);

  const STORAGE_KEY = `@bemestar_animal_${animal?.id}`;

  useEffect(() => {
    if (animal?.id) buscarDados();
  }, [animal?.id]);

  async function buscarDados() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      setListaBemEstar(dados ? JSON.parse(dados) : []);
    } catch (e) {
      console.error("Erro ao carregar bem-estar", e);
    }
  }

  async function salvar() {
    if (!atividade.trim() || !obs.trim()) {
      return Alert.alert("Erro", "Preencha a atividade e a observação.");
    }

    const novaLista = [{ atividade, obs, id: Date.now().toString() }, ...listaBemEstar];

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
      setAtividade("");
      setObs("");
      buscarDados();
      Alert.alert("Sucesso", "Rotina registrada!");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#4a8f7a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bem-Estar: {animal?.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <TextInput placeholder="Atividade (ex: Passeio, Ração)" style={styles.input} value={atividade} onChangeText={setAtividade} />
        <TextInput placeholder="Observações (ex: Comeu bem)" style={styles.input} value={obs} onChangeText={setObs} />
        <TouchableOpacity style={styles.btn} onPress={salvar}>
          <Text style={styles.btnText}>REGISTRAR ROTINA</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>HISTÓRICO DE BEM-ESTAR:</Text>


      <FlatList
        data={listaBemEstar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <MaterialCommunityIcons name="heart-pulse" size={24} color="#FF9800" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardNome}>{item.atividade}</Text>
              <Text style={styles.cardSub}>{item.obs}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>Nenhum registro encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF9F2" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#E67E22" },
  form: {
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    backgroundColor: "#FFFBF5",
    borderWidth: 1,
    borderColor: "#FFCC80",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#FF9800",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  subtitulo: { marginLeft: 20, fontWeight: "bold", color: "#E67E22", marginBottom: 10 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#FF9800",
  },
  cardNome: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardSub: { fontSize: 14, color: "#666", fontStyle: "italic" },
});
