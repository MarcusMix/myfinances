import App from '../../../App';
import { styles } from './ProfileStyle';
import { Button, Text, View } from 'react-native';
import AppTitle from '../../component/appTitle/AppTitle';
import { useEffect, useState } from "react";
import { getUsuarioLogado } from "../../services/usuarioService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppPressable from "../../component/appPressable/AppPressable";

export default function Profile({ navigation }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    dt_nascimento: ""
  });

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('token_type');
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao remover o token", error);
    }
  };

  const mountPage = async () => {
    try {
      const usuario_logado = await getUsuarioLogado();
      console.log('Dados do usuário:', usuario_logado);
      setUsuario(usuario_logado);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  }

  useEffect(() => {
    mountPage();
  }, []);

  return (
    <View style={styles.container}>
      <AppTitle text="Meus Dados" />

      <View>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{usuario.nome}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{usuario.email}</Text>

        <Text style={styles.label}>Data de Nascimento</Text>
        <Text style={styles.value}>{usuario.dt_nascimento}</Text>
      </View>

      <AppPressable text={"Sair"} action={logout} />
    </View>
  )
}