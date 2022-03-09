import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { View, Text, Button } from "react-native";
import { Pages } from "../App";
import Input from "../components/Input";
import { styles } from "./Login";

interface Props {
  navigation: NativeStackNavigationProp<Pages, "Register">;
}
export interface User {
  name?: string;
  email?: string;
  password?: string;
}
interface Action {
  type: string;
  value: any;
}
const initialState: User = { name: "", email: "", password: "" };

const reducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "email":
      return { ...state, email: action.value };
    case "password":
      return { ...state, password: action.value };
    default:
      throw new Error("Debe proporcionar un tipo de accion");
  }
};

const Register: React.FC<Props> = ({ navigation }) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<User>(
        "http://192.168.0.15:3021/users/me"
      );

      if (data) {
        navigation.navigate("Home");
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Text
        style={{
          fontSize: 50,
          color: "#1a7dff",
        }}
      >
        Bienvenido
      </Text>
      <Input
        onChangeText={(value) => dispatch({ type: "name", value })}
        value={user.name}
        placeholder="Nombre"
      />
      <Input
        value={user.email}
        onChangeText={(value) => dispatch({ type: "email", value })}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Input
        value={user.password}
        onChangeText={(value) => dispatch({ type: "password", value })}
        placeholder="Clave"
        keyboardType="visible-password"
      />
      <Input placeholder="Confirmar Clave" keyboardType="visible-password" />

      <Button
        title="Crear Cuenta"
        onPress={async () => {
          const { data, status } = await axios.post(
            "http://192.168.0.15:3021/users",
            user
          );
          console.log(data);
          if (data && status == 200) {
            navigation.navigate("Home");
          }
        }}
      />
      <Text
        style={{
          marginTop: 16,
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        Ya tengo un cuenta
      </Text>
    </View>
  );
};

export default Register;
