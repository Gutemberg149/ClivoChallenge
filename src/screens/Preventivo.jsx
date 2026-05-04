import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Preventivo({ route, navigation }) {
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
      setNomeServico(""); setDescricaoServico(""); setDataServico("");
      setServicoEditado(null);
      buscarServicos();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
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
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#4a8f7a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preventivo: {subcategory?.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitulo}>{servicoEditado !== null ? "EDITAR REGISTRO" : "NOVO REGISTRO"}</Text>

        <TextInput placeholder="Nome do serviço (ex: Vacina)" style={styles.input} value={nomeServico} onChangeText={setNomeServico} />

        <TextInput placeholder="Descrição" style={[styles.input, styles.textArea]} multiline value={descricaoServico} onChangeText={setDescricaoServico} />

        <TextInput placeholder="Data (DD/MM)" style={styles.input} value={dataServico} onChangeText={setDataServico} />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
          <Text style={styles.btnText}>{servicoEditado !== null ? "ATUALIZAR" : "SALVAR NO HISTÓRICO"}</Text>
        </TouchableOpacity>

        {servicoEditado !== null && (
          <TouchableOpacity
            style={styles.btnCancelar}
            onPress={() => {
              setServicoEditado(null);
              setNomeServico("");
              setDescricaoServico("");
              setDataServico("");
            }}
          >
            <Text style={styles.btnTextCancelar}>Cancelar Edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subtitulo}>HISTÓRICO:</Text>

      <FlatList
        data={listaServicos}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum serviço registrado.</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.listaItens}>
            <View style={styles.itemHeader}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#4a8f7a" />
              <Text style={styles.nomeServico}>{item.nome}</Text>
              <Text style={styles.itemDataText}>{item.data}</Text>
            </View>

            <Text style={styles.descricaoServico}>{item.descricao}</Text>

            <View style={styles.botoesContainer}>
              <TouchableOpacity onPress={() => editarServico(index)} style={styles.iconBtn}>
                <MaterialCommunityIcons name="pencil" size={20} color="#FF9800" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deletarServico(index, item.nome)} style={styles.iconBtn}>
                <MaterialCommunityIcons name="delete" size={20} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c6eadd" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#4a8f7a" },
  form: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  formTitulo: { fontSize: 14, fontWeight: "bold", color: "#4a8f7a", marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  textArea: { height: 60, textAlignVertical: "top" },
  btnSalvar: {
    backgroundColor: "#4a8f7a",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCancelar: { marginTop: 10, alignItems: "center" },
  btnTextCancelar: { color: "#F44336", fontSize: 13 },
  btnText: { color: "white", fontWeight: "bold" },
  subtitulo: { marginLeft: 20, fontWeight: "bold", color: "#4a8f7a", marginBottom: 5 },
  listaItens: {
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  itemHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  nomeServico: { fontSize: 16, fontWeight: "bold", color: "#333", flex: 1 },
  itemDataText: { fontSize: 12, color: "#666" },
  descricaoServico: { fontSize: 14, color: "#666", marginTop: 5, marginBottom: 10 },
  botoesContainer: { flexDirection: "row", justifyContent: "flex-end", gap: 20 },
  iconBtn: { padding: 5 },
  emptyText: { textAlign: "center", color: "#666", marginTop: 30 },
});
