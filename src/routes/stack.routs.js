// // import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import TabRoutes from "../routes/tab.routes";
// // import Animal from "../screens/Animal";
// // import Preventivo from "../screens/Preventivo";
// // import Terapeutico from "../screens/Terapeutico";
// // import BemEstar from "../screens/BemEstar";

// // const Stack = createNativeStackNavigator();

// // export default function Routes() {
// //   return (
// //     <Stack.Navigator screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="MainTabs" component={TabRoutes} />

// //       <Stack.Screen name="animal" component={Animal} />
// //       <Stack.Screen name="Preventivo" component={Preventivo} />
// //       <Stack.Screen name="Terapeutico" component={Terapeutico} />
// //       <Stack.Screen name="BemEstar" component={BemEstar} />
// //     </Stack.Navigator>
// //   );
// // }

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "../screens/Home"; // Importe a Home diretamente
// import Animal from "../screens/Animal";
// import Preventivo from "../screens/Preventivo";
// import Terapeutico from "../screens/Terapeutico";
// import BemEstar from "../screens/BemEstar";
// import SubcategoriaListagem from "../screens/SubcategoriaListagem";

// const Stack = createNativeStackNavigator();

// export default function Routes() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
//       <Stack.Screen name="home" component={Home} />
//       <Stack.Screen name="SubcategoriaListagem" component={SubcategoriaListagem} />
//       <Stack.Screen name="animal" component={Animal} />
//       <Stack.Screen name="Preventivo" component={Preventivo} />
//       <Stack.Screen name="Terapeutico" component={Terapeutico} />
//       <Stack.Screen name="BemEstar" component={BemEstar} />
//     </Stack.Navigator>
//   );
// }

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importação das novas telas de acesso
import Login from "../screens/Login";
import Signup from "../screens/Signup";

// Importação das telas de fluxo principal
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