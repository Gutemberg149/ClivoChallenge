import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext"; 

const CardPilar = ({ titulo, subtexto, icone, cor, onPress, colors }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: cor, backgroundColor: colors.card }]} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.cardIcon}>
      <MaterialCommunityIcons name={icone} size={28} color={cor} />
    </View>
    <View style={styles.cardTextos}>
      <Text style={[styles.cardTitulo, { color: colors.text }]}>{titulo}</Text>
      <Text style={[styles.cardSubtexto, { color: colors.subText }]}>{subtexto}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color={colors.subText} />
  </TouchableOpacity>
);

export default function Animal({ route, navigation }) {
  const { colors } = useTheme();
  const { animal, subcategory } = route.params;

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons name="arrow-left" size={26} color={colors.text} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.text }]}>{animal.nome}</Text>
          <View style={{ width: 45 }} />
        </View>

        <View style={styles.content}>
          <Text style={[styles.subTitle, { color: colors.subText }]}>Espécie: {subcategory.nome}</Text>

          <CardPilar
            titulo="Preventivo"
            subtexto="Vacinas, Vermífugos e Check-ups"
            icone="shield-check"
            cor="#4CAF50"
            colors={colors}
            onPress={() => navigation.navigate("Preventivo", { animal, subcategory })}
          />

          <CardPilar
            titulo="Terapêutico"
            subtexto="Adesão Medicamentosa"
            icone="pill"
            cor="#F44336"
            colors={colors}
            onPress={() => navigation.navigate("Terapeutico", { animal, subcategory })}
          />

          <CardPilar
            titulo="Bem-estar"
            subtexto="Nutrição e Comportamento"
            icone="heart"
            cor="#FF9800"
            colors={colors}
            onPress={() => navigation.navigate("BemEstar", { animal, subcategory })}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  content: { padding: 20 },
  card: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    borderLeftWidth: 6,
    // Sombras
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: { marginRight: 15 },
  cardTextos: { flex: 1 },
  cardTitulo: { fontSize: 18, fontWeight: "bold" },
  cardSubtexto: { fontSize: 13, marginTop: 2 },
});
