import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
axios.defaults.withCredentials = true;

export type Pages = {
  Login: any;
  Register: any;
  Home: any;
};
const Stack = createNativeStackNavigator<Pages>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ header: () => null }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
