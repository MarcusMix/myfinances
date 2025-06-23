import { styles } from "./LoginStyle";
import { Alert, Text, View } from "react-native";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import React, { useState } from "react";
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import { loginUsuario, postUsuarioAsyncStorage } from "../../services/usuarioService";


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    console.log('Iniciando processo de login...');

    if (email === "" || senha === "") {
      console.log('Campos vazios detectados');
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const user = {
      email: email,
      senha: senha,
    };
    console.log('Dados do usuário preparados:', { email: user.email, senha: '***' });

    try {
      console.log('Tentando fazer requisição de login...');
      const response = await loginUsuario(user);
      console.log('Resposta recebida:', response);

      if (response.access_token) {
        console.log('Token recebido com sucesso');
        Alert.alert("Sucesso", "Login realizado com sucesso");
        console.log('Salvando dados no AsyncStorage...');
        await postUsuarioAsyncStorage({
          token: response.access_token,
          token_type: response.token_type
        });
        console.log('Navegando para tela principal...');
        navigation.replace('Main');
      } else {
        console.log('Erro: Token não recebido na resposta');
        Alert.alert("Erro", "Erro ao realizar login. Tente novamente.");
      }
    } catch (error) {
      console.log('Erro durante o login:', error);
      console.log('Detalhes do erro:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      Alert.alert("Erro", error.message || "Erro ao realizar login. Tente novamente.");
    }
  };


  const register = () => {
    navigation.replace('Register');
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleChangeSenha = (value: string) => {
    setSenha(value);
  };

  return (
    <View style={styles.container}>
      <AppTitle title="Login" />
      <AppTextInput
        label="Email"
        placeholder="Digite seu email"
        onValueChange={handleChangeEmail}
      />
      <AppTextInput
        label="Senha"
        placeholder="Digite sua senha"
        onValueChange={handleChangeSenha}
      />
      <AppPressable text="Entrar" action={handleLogin} />
      <Text style={styles.register} onPress={register}>Cadastre-se</Text>
    </View>
  );
}
