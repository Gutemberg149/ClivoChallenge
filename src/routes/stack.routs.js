import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "../routes/tab.routes";
import Animal from "../screens/Animal";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={TabRoutes} /> 
      <Stack.Screen name="animal" component={Animal} />
    </Stack.Navigator>
  );
}
