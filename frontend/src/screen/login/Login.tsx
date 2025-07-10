import { styles } from "./LoginStyle";
import { Alert, Text, View } from "react-native";
import TextInput from "../../component/TextInput/TextInput";
import React, { useState } from "react";
import Title from "../../component/Title/Title";
import Pressable from "../../component/Pressable/Pressable";
import {
  loginUsuario,
  postUsuarioAsyncStorage,
  getUsuarioLogado,
} from "../../services/usuarioService";
import { useAuth } from "../../context/AuthContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    console.log("Iniciando processo de login...");

    if (email === "" || senha === "") {
      console.log("Campos vazios detectados");
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const user = {
      email: email,
      senha: senha,
    };
    console.log("Dados do usuário preparados:", {
      email: user.email,
      senha: "senha***",
    });

    try {
      console.log("Tentando fazer requisição de login...");
      const response = await loginUsuario(user);
      console.log("Resposta recebida:", response);

      if (response.access_token) {
        console.log("Token recebido com sucesso");
        Alert.alert("Sucesso", "Login realizado com sucesso");
        console.log("Salvando dados no AsyncStorage...");
        await postUsuarioAsyncStorage({
          token: response.access_token,
          token_type: response.token_type,
        });

        const userData = await getUsuarioLogado();
        if (userData) {
          await signIn(userData);
        }

        console.log("Navegando para tela principal...");
        navigation.replace("Main");
      } else {
        console.log("Erro: Token não recebido na resposta");
        Alert.alert("Erro", "Erro ao realizar login. Tente novamente.");
      }
    } catch (error) {
      console.log("Erro durante o login:", error);
      console.log("Detalhes do erro:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert(
        "Erro",
        error.message || "Erro ao realizar login. Tente novamente.",
      );
    }
  };

  const register = () => {
    navigation.replace("Register");
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleChangeSenha = (value: string) => {
    setSenha(value);
  };

  return (
    <View style={styles.container}>
      <Title title="Login" />
      <TextInput
        label="Email"
        placeholder="Digite seu email"
        onValueChange={handleChangeEmail}
      />
      <TextInput
        label="Senha"
        placeholder="Digite sua senha"
        onValueChange={handleChangeSenha}
      />
      <Pressable text="Entrar" action={handleLogin} />
      <Text style={styles.register} onPress={register}>
        Cadastre-se
      </Text>
    </View>
  );
}
