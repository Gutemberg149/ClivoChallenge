import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext"; 

export default function Terapeutico({ route, navigation }) {
  const { colors, dark } = useTheme();
  const { animal, subcategory } = route.params || {};
  const [remedio, setRemedio] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [horario, setHorario] = useState("");
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [editando, setEditando] = useState(null);

  const STORAGE_KEY = `@terapeutico_animal_${animal?.id}`;

  useEffect(() => {
    if (animal?.id) buscarDados();
  }, [animal?.id]);

  async function buscarDados() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      setListaMedicamentos(dados ? JSON.parse(dados) : []);
    } catch (e) {
      console.error(e);
    }
  }

  async function salvar() {
    if (!remedio || !dosagem || !horario) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    let meds = [...listaMedicamentos];
    const novoMed = { remedio, dosagem, horario, id: Date.now().toString() };

    if (editando !== null) {
      meds[editando.index] = novoMed;
    } else {
      meds.push(novoMed);
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
      limparCampos();
      buscarDados();
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar.");
    }
  }

  function limparCampos() {
    setRemedio("");
    setDosagem("");
    setHorario("");
    setEditando(null);
  }

  async function deletar(index) {
    Alert.alert("Excluir", "Deseja remover este medicamento?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          const novaLista = listaMedicamentos.filter((_, i) => i !== index);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
          buscarDados();
        },
      },
    ]);
  }

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Dinâmico */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons name="arrow-left" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Terapêutico: {animal?.nome}</Text>
          <View style={{ width: 42 }} />
        </View>

       
        <View style={[styles.form, { backgroundColor: colors.card }]}>
          <Text style={[styles.formLabel, { color: "#F44336" }]}>{editando ? "EDITAR MEDICAMENTO" : "ADICIONAR MEDICAMENTO"}</Text>

          <TextInput
            placeholder="Nome do Medicamento"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#FFF",
                color: colors.text,
                borderColor: dark ? "#444" : "#FEE2E2",
              },
            ]}
            value={remedio}
            onChangeText={setRemedio}
          />
          <TextInput
            placeholder="Dosagem (ex: 5mg ou 2 gotas)"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#FFF",
                color: colors.text,
                borderColor: dark ? "#444" : "#FEE2E2",
              },
            ]}
            value={dosagem}
            onChangeText={setDosagem}
          />
          <TextInput
            placeholder="Horário (ex: 08:00 / 20:00)"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#FFF",
                color: colors.text,
                borderColor: dark ? "#444" : "#FEE2E2",
              },
            ]}
            value={horario}
            onChangeText={setHorario}
          />

          <TouchableOpacity style={[styles.btn, { backgroundColor: "#F44336" }]} onPress={salvar}>
            <MaterialCommunityIcons name="check-bold" size={20} color="white" />
            <Text style={styles.btnText}>{editando ? "ATUALIZAR" : "SALVAR"}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={listaMedicamentos}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
          renderItem={({ item, index }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={[styles.iconBox, { backgroundColor: dark ? "#3d1f1f" : "#ffebee" }]}>
                <MaterialCommunityIcons name="pill" size={24} color="#F44336" />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.cardNome, { color: colors.text }]}>{item.remedio}</Text>
                <Text style={[styles.cardSub, { color: colors.subText }]}>
                  {item.dosagem} • {item.horario}
                </Text>
              </View>

              <TouchableOpacity onPress={() => deletar(index)} style={styles.deleteBtn}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color={dark ? "#ff6b6b" : "#D32F2F"} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.subText }]}>Nenhum medicamento registrado.</Text>}
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
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  form: {
    margin: 20,
    padding: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  formLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 15, textAlign: "center", letterSpacing: 1 },
  input: {
    borderWidth: 1.5,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },
  btn: {
    height: 52,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 5,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#F44336",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  cardNome: { fontSize: 17, fontWeight: "bold" },
  cardSub: { fontSize: 14, marginTop: 2 },
  deleteBtn: { padding: 5 },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 15 },
});
