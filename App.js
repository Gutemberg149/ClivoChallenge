import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
// import TabRoutes from "./src/routes/tab.routes";
import Routes from "./src/routes/stack.routs";

export default function App() {
  return (
    <SafeAreaProvider style={styles.APPGlobal}>
      <NavigationContainer >
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  APPGlobal: {
   backgroundColor:"white"
  },
});
