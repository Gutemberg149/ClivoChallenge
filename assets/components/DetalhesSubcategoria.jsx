import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CardCuidado from "../components/CardCuidado"; 

export default function DetalhesSubcategoria({ route }) {
  // Pegando os dados passados pela sua Home
  const { subcategory } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{subcategory.nome}</Text>
        <Text style={styles.subtitle}>Gestão de Ciclo de Vida</Text>
      </View>

      <View style={styles.content}>
  
        <CardCuidado titulo="Plano Preventivo" subtexto="Vacinas, vermífugos e exames de rotina." icone="shield-check" cor="#4CAF50" onPress={() => {}} />

        <CardCuidado titulo="Acompanhamento" subtexto="Controle de medicação e doenças crônicas." icone="pill" cor="#F44336" onPress={() => {}} />


        <CardCuidado titulo="Bem-estar e Nutrição" subtexto="Dieta ideal e comportamento por fase de vida." icone="heart" cor="#FF9800" onPress={() => {}} />

 
        <View style={styles.aiBox}>
          <View style={styles.aiHeader}>
            <MaterialCommunityIcons name="robot" size={24} color="#fff" />
            <Text style={styles.aiTitle}>Análise da IA</Text>
          </View>
          <Text style={styles.aiText}>Com base na raça {subcategory.nome}, recomendo atenção redobrada à hidratação e check-up cardíaco anual.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c6eadd" },
  header: { padding: 40, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#4a8f7a" },
  subtitle: { fontSize: 16, color: "#79bca6" },
  content: { padding: 20 },
  aiBox: {
    backgroundColor: "#4a8f7a",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  aiHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  aiTitle: { color: "#fff", fontWeight: "bold", marginLeft: 10, fontSize: 18 },
  aiText: { color: "#fff", fontStyle: "italic", lineHeight: 20 },
});
