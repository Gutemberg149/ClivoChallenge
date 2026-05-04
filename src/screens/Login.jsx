import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [nome, setNome] = useState(""); 
  const [senha, setSenha] = useState("");


  const isButtonDisabled = nome.trim() === "" || senha.trim() === "";

  const handleLogin = async () => {
    try {

      await AsyncStorage.setItem("@usuario_nome", nome.trim());
  
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível realizar o acesso.");
    }
  };

  return (
    <LinearGradient colors={["#d4fc79", "#96e6a1"]} style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../assets/logo/logo2.png")} style={styles.logo} />

        <Text style={styles.title}>Bem-vindo ao MedVet</Text>


        <TextInput 
          placeholder="Seu Nome" 
          style={styles.input} 
          value={nome} 
          onChangeText={setNome} 
        />

 
        <TextInput 
          placeholder="Senha" 
          style={styles.input} 
          value={senha} 
          onChangeText={setSenha} 
          secureTextEntry 
        />

        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleLogin} 
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.link}>
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  logo: { 
    width: 80, 
    height: 80, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#4a8f7a", 
    marginBottom: 30 
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#4a8f7a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { 
    backgroundColor: "#ccc" 
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  link: { 
    marginTop: 20 
  },
  linkText: { 
    color: "#4a8f7a", 
    fontWeight: "600" 
  },
});