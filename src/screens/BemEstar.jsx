import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext"; 

export default function BemEstar({ route, navigation }) {
  const { colors, dark } = useTheme(); 
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
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
      
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons name="arrow-left" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Bem-Estar: {animal?.nome}</Text>
          <View style={{ width: 42 }} />
        </View>

       
        <View style={[styles.form, { backgroundColor: colors.card }]}>
          <TextInput
            placeholder="Atividade (ex: Passeio, Ração)"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#FFFBF5",
                color: colors.text,
                borderColor: dark ? "#444" : "#FFCC80",
              },
            ]}
            value={atividade}
            onChangeText={setAtividade}
          />
          <TextInput
            placeholder="Observações (ex: Comeu bem)"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#FFFBF5",
                color: colors.text,
                borderColor: dark ? "#444" : "#FFCC80",
              },
            ]}
            value={obs}
            onChangeText={setObs}
          />
          <TouchableOpacity style={styles.btn} onPress={salvar}>
            <Text style={styles.btnText}>REGISTRAR ROTINA</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.subtitulo, { color: colors.text }]}>HISTÓRICO DE BEM-ESTAR:</Text>

        <FlatList
          data={listaBemEstar}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={[styles.iconCircle, { backgroundColor: dark ? "#3d2b1f" : "#FFF3E0" }]}>
                <MaterialCommunityIcons name="heart-pulse" size={24} color="#FF9800" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.cardNome, { color: colors.text }]}>{item.atividade}</Text>
                <Text style={[styles.cardSub, { color: colors.subText }]}>{item.obs}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.subText }]}>Nenhum registro encontrado.</Text>}
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  form: {
    margin: 20,
    padding: 20,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    borderWidth: 1,
    height: 52,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#FF9800",
    height: 52,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  subtitulo: { marginLeft: 25, fontWeight: "bold", marginBottom: 15, fontSize: 14, opacity: 0.8 },
  card: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: "#FF9800",
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardNome: { fontSize: 17, fontWeight: "bold" },
  cardSub: { fontSize: 14, fontStyle: "italic", marginTop: 2 },
  emptyText: { textAlign: "center", marginTop: 30, fontSize: 14 },
});
