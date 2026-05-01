import { Text, StyleSheet, View,TouchableOpacity } from "react-native";

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Animal</Text>
      <TouchableOpacity style={styles.square} onPress={() => navigation.navigate("home")} activeOpacity={0.7}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c37dbe",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  }
});
