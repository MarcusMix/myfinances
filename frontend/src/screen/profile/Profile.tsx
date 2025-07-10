import App from "../../../App";
import { styles } from "./ProfileStyle";
import { Button, Text, View } from "react-native";
import Title from "../../component/Title/Title";
import { useEffect, useState } from "react";
import { getUsuarioLogado, logoutUsuario } from "../../services/usuarioService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pressable from "../../component/Pressable/Pressable";
import { useAuth } from "../../context/AuthContext";
import { formatarData } from "../../services/utils";

export default function Profile({ navigation }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    dt_nascimento: "",
  });

  const { signOut } = useAuth();
  const logout = async () => {
    try {
      await logoutUsuario();
      await signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao fazer logout", error);
    }
  };

  const mountPage = async () => {
    try {
      const usuario_logado = await getUsuarioLogado();
      console.log("Dados do usuário:", usuario_logado);
      setUsuario(usuario_logado);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    mountPage();
  }, []);

  return (
    <View style={styles.container}>
      <Title title="Meus Dados" />

      <View>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{usuario?.nome || ""}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{usuario?.email || ""}</Text>

        <Text style={styles.label}>Data de Nascimento</Text>
        <Text style={styles.value}>
          {formatarData(usuario?.dt_nascimento) || ""}
        </Text>
      </View>

      <Pressable text={"Sair"} action={logout} />
    </View>
  );
}
