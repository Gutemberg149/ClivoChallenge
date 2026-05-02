import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "../routes/tab.routes";
import Animal from "../screens/Animal";
import Preventivo from "../screens/Preventivo";
import Terapeutico from "../screens/Terapeutico";
import BemEstar from "../screens/BemEstar";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabRoutes} />

      <Stack.Screen name="animal" component={Animal} />
      <Stack.Screen name="Preventivo" component={Preventivo} />
      <Stack.Screen name="Terapeutico" component={Terapeutico} />
      <Stack.Screen name="BemEstar" component={BemEstar} />
    </Stack.Navigator>
  );
}
