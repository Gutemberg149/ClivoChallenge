import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Signup from "../screens/Signup";


import Home from "../screens/Home"; 
import Animal from "../screens/Animal";
import Preventivo from "../screens/Preventivo";
import Terapeutico from "../screens/Terapeutico";
import BemEstar from "../screens/BemEstar";
import SubcategoriaListagem from "../screens/SubcategoriaListagem";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator 

      initialRouteName="Login"
      screenOptions={{ 
        headerShown: false, 
        animation: "slide_from_right" 
      }}
    >

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="SubcategoriaListagem" component={SubcategoriaListagem} />
      <Stack.Screen name="animal" component={Animal} />
      <Stack.Screen name="Preventivo" component={Preventivo} />
      <Stack.Screen name="Terapeutico" component={Terapeutico} />
      <Stack.Screen name="BemEstar" component={BemEstar} />
    </Stack.Navigator>
  );
}