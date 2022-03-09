import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Pages } from "../App";
import Input from "../components/Input";
import { User } from "./Register";

interface Props {
  navigation: NativeStackNavigationProp<Pages, "Login">;
}
const Login: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function entrar() {
    // console.log(process.env.API_URL);
    const { data, status } = await axios.post(
      "http://192.168.0.15:3021/users/login",
      {
        email,
        password,
      }
    );
    console.log(data, status);
    if (data && status == 200) {
      navigation.navigate("Home");
    }

    // const res = await fetch("http://192.168.0.15:3021/users/login", {
    //   credentials: "include",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // console.log(await res.json());
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 50,
          color: "#1a7dff",
        }}
      >
        Bienvenido
      </Text>
      <Text>{email}</Text>
      <Text>{password}</Text>
      <Input
        onChangeText={setEmail}
        placeholder="email"
        value={email}
        keyboardType="email-address"
      />
      <Input
        onChangeText={setPassword}
        placeholder="password"
        value={password}
        keyboardType="email-address"
      />
      <Button title="Entrar" onPress={entrar} />
      <Text
        style={{
          marginTop: 16,
        }}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        Crear cuenta
      </Text>

      <StatusBar style="auto" />
    </View>
  );
};
export default Login;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
