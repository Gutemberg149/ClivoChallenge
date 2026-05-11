import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext"; 

export default function Preventivo({ route, navigation }) {
  const { colors, dark } = useTheme();
  const { animal, subcategory } = route.params || {};
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [dataServico, setDataServico] = useState("");
  const [listaServicos, setListaServicos] = useState([]);
  const [servicoEditado, setServicoEditado] = useState(null);

  const STORAGE_KEY = `@preventivo_animal_${animal?.id}`;

  useEffect(() => {
    if (animal?.id) buscarServicos();
  }, [animal?.id]);

  async function buscarServicos() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      setListaServicos(dados ? JSON.parse(dados) : []);
    } catch (e) {
      console.error("Erro ao buscar serviços", e);
    }
  }

  async function salvar() {
    if (!nomeServico.trim() || !descricaoServico.trim() || !dataServico.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      let servicos = [...listaServicos];
      const novoDado = {
        nome: nomeServico.trim(),
        descricao: descricaoServico.trim(),
        data: dataServico.trim(),
      };

      if (servicoEditado !== null) {
        servicos[servicoEditado.index] = novoDado;
      } else {
        servicos.push(novoDado);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
      limparCampos();
      buscarServicos();
      Alert.alert("Sucesso", servicoEditado !== null ? "Registro atualizado!" : "Salvo com sucesso!");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  function limparCampos() {
    setNomeServico("");
    setDescricaoServico("");
    setDataServico("");
    setServicoEditado(null);
  }

  async function deletarServico(index, nome) {
    Alert.alert("Confirmar Exclusão", `Excluir o serviço ${nome}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const novaLista = listaServicos.filter((_, ind) => ind !== index);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
          buscarServicos();
        },
      },
    ]);
  }

  function editarServico(index) {
    const servico = listaServicos[index];
    setNomeServico(servico.nome);
    setDescricaoServico(servico.descricao);
    setDataServico(servico.data);
    setServicoEditado({ index });
  }

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
     
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons name="arrow-left" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Preventivo: {animal?.nome}</Text>
          <View style={{ width: 42 }} />
        </View>

        <View style={[styles.form, { backgroundColor: colors.card }]}>
          <Text style={[styles.formTitulo, { color: colors.primary }]}>{servicoEditado !== null ? "EDITAR REGISTRO" : "NOVO REGISTRO"}</Text>

          <TextInput
            placeholder="Nome do serviço (ex: Vacina)"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[styles.input, { backgroundColor: dark ? "#333" : "#fafafa", color: colors.text, borderColor: dark ? "#444" : "#eee" }]}
            value={nomeServico}
            onChangeText={setNomeServico}
          />

          <TextInput
            placeholder="Descrição"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[styles.input, styles.textArea, { backgroundColor: dark ? "#333" : "#fafafa", color: colors.text, borderColor: dark ? "#444" : "#eee" }]}
            multiline
            value={descricaoServico}
            onChangeText={setDescricaoServico}
          />

          <TextInput
            placeholder="Data (DD/MM)"
            placeholderTextColor={dark ? "#999" : "#666"}
            style={[styles.input, { backgroundColor: dark ? "#333" : "#fafafa", color: colors.text, borderColor: dark ? "#444" : "#eee" }]}
            value={dataServico}
            onChangeText={setDataServico}
          />

          <TouchableOpacity style={[styles.btnSalvar, { backgroundColor: colors.primary }]} onPress={salvar}>
            <Text style={styles.btnText}>{servicoEditado !== null ? "ATUALIZAR" : "SALVAR NO HISTÓRICO"}</Text>
          </TouchableOpacity>

          {servicoEditado !== null && (
            <TouchableOpacity style={styles.btnCancelar} onPress={limparCampos}>
              <Text style={styles.btnTextCancelar}>Cancelar Edição</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={[styles.subtitulo, { color: colors.text }]}>HISTÓRICO:</Text>

        <FlatList
          data={listaServicos}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 20 }}
          ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.subText }]}>Nenhum serviço registrado.</Text>}
          renderItem={({ item, index }) => (
            <View style={[styles.listaItens, { backgroundColor: colors.card }]}>
              <View style={styles.itemHeader}>
                <View style={[styles.iconBox, { backgroundColor: dark ? "#1b2e26" : "#e8f5f0" }]}>
                  <MaterialCommunityIcons name="shield-check" size={24} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.nomeServico, { color: colors.text }]}>{item.nome}</Text>
                  <Text style={[styles.itemDataText, { color: colors.subText }]}>{item.data}</Text>
                </View>
              </View>

              <Text style={[styles.descricaoServico, { color: colors.subText }]}>{item.descricao}</Text>

              <View style={styles.botoesContainer}>
                <TouchableOpacity onPress={() => editarServico(index)} style={[styles.iconBtn, { backgroundColor: dark ? "#3d2b1f" : "#fff8e1" }]}>
                  <MaterialCommunityIcons name="pencil" size={18} color="#FF9800" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletarServico(index, item.nome)} style={[styles.iconBtn, { backgroundColor: dark ? "#3d1f1f" : "#ffebee" }]}>
                  <MaterialCommunityIcons name="delete" size={18} color="#F44336" />
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    paddingBottom: 15,
  },
  backBtn: { padding: 8, borderRadius: 12 },
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
  formTitulo: { fontSize: 14, fontWeight: "bold", marginBottom: 15, textAlign: "center", letterSpacing: 1 },
  input: {
    borderWidth: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },
  textArea: { height: 70, textAlignVertical: "top", paddingTop: 10 },
  btnSalvar: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    elevation: 2,
  },
  btnCancelar: { marginTop: 12, alignItems: "center" },
  btnTextCancelar: { color: "#F44336", fontSize: 13, fontWeight: "600" },
  btnText: { color: "white", fontWeight: "bold", fontSize: 15 },
  subtitulo: { marginLeft: 25, fontWeight: "bold", marginBottom: 15, fontSize: 14, opacity: 0.8 },
  listaItens: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: "#4a8f7a", // Cor fixa do Preventivo ou use colors.primary
  },
  itemHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  nomeServico: { fontSize: 17, fontWeight: "bold" },
  itemDataText: { fontSize: 12, marginTop: 2 },
  descricaoServico: { fontSize: 14, marginTop: 10, marginBottom: 12, lineHeight: 20 },
  botoesContainer: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  iconBtn: { padding: 10, borderRadius: 10 },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 15 },
});
