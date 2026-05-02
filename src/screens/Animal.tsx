import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const CardPilar = ({ titulo, subtexto, icone, cor, onPress }) => (
  <TouchableOpacity
    style={[styles.card, { borderLeftColor: cor }]}
    onPress={onPress} 
    activeOpacity={0.8}
  >
    <View style={styles.cardIcon}>
      <MaterialCommunityIcons name={icone} size={28} color={cor} />
    </View>
    <View style={styles.cardTextos}>
      <Text style={styles.cardTitulo}>{titulo}</Text>
      <Text style={styles.cardSubtexto}>{subtexto}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
  </TouchableOpacity>
);

export default function Animal({ route, navigation }) {
  // Pegando os dados passados pela Home
  const { subcategory } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#4a8f7a" />
        </TouchableOpacity>
        <Text style={styles.title}>{subcategory.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        {/* PILAR 1: PREVENTIVO - Navega para a página Preventivo */}
        <CardPilar
          titulo="Preventivo"
          subtexto="Vacinas, Vermífugos e Check-ups"
          icone="shield-check"
          cor="#4CAF50"
          onPress={() => navigation.navigate("Preventivo", { subcategory })}
        />

        {/* PILAR 2: TERAPÊUTICO - Navega para a página Terapeutico */}
        <CardPilar
          titulo="Terapêutico"
          subtexto="Adesão Medicamentosa"
          icone="pill"
          cor="#F44336"
          onPress={() => navigation.navigate("Terapeutico", { subcategory })}
        />

        {/* PILAR 3: BEM-ESTAR - Navega para a página BemEstar */}
        <CardPilar
          titulo="Bem-estar"
          subtexto="Nutrição e Comportamento"
          icone="heart"
          cor="#FF9800"
          onPress={() => navigation.navigate("BemEstar", { subcategory })}
        />

        {/* PILAR 4: IA (Destaque do projeto) */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <MaterialCommunityIcons name="robot" size={22} color="#fff" />
            <Text style={styles.aiTitle}>Análise IA Personalizada</Text>
          </View>
          <Text style={styles.aiTexto}>
            Baseado na espécie {subcategory.nome}, a IA recomenda priorizar o contato clínico se houver perda de apetite nesta fase de vida.
          </Text>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#4a8f7a" },
  content: { padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardIcon: { marginRight: 15 },
  cardTextos: { flex: 1 },
  cardTitulo: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardSubtexto: { fontSize: 12, color: "#666" },
  aiCard: {
    backgroundColor: "#4a8f7a",
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    elevation: 3,
  },
  aiHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  aiTitle: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
  aiTexto: { color: "#fff", fontSize: 13, lineHeight: 18, fontStyle: "italic" },
});
