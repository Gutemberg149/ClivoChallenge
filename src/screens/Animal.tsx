import { Text, StyleSheet, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Animal;</Text>
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
});
