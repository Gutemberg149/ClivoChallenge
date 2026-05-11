import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const isButtonDisabled = nome.trim() === "" || email.trim() === "" || senha.trim() === "";

  const handleSignup = async () => {
    try {

      await AsyncStorage.setItem("@usuario_nome", nome);


      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar os dados de usuário.");
    }
  };

  return (
    <LinearGradient colors={["#96e6a1", "#192f6a"]} style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleSignup} 
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Criar Conta</Text>

        <TextInput placeholder="Nome Completo" style={styles.input} value={nome} onChangeText={setNome} />

        <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <TextInput placeholder="Senha" style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />

        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={() => navigation.navigate("home")}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },
  backBtn: { alignSelf: "flex-start", marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#4a8f7a", marginBottom: 30 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#192f6a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#ccc" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
