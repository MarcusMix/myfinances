import { styles } from "./RegisterStyle";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import Title from "../../component/Title/Title";
import TextInput from "../../component/TextInput/TextInput";
import { useState } from "react";
import Pressable from "../../component/Pressable/Pressable";
import { cadastrarUsuario } from "../../services/usuarioService";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const handleRegister = async () => {
    if (senha == "" || senha !== confirmSenha) {
      Alert.alert("Erro", "Senhas não conferem");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "" || !regex.test(email)) {
      Alert.alert("Erro", "Insira um email válido");
      return;
    }
    if (!data) {
      Alert.alert("Erro", "Selecione uma data de nascimento");
      return;
    }

    const usuario = {
      email: email,
      senha: senha,
      senha_confirmacao: confirmSenha,
      nome: nome,
      dt_nascimento: data,
    };
    try {
      const response = await cadastrarUsuario(usuario);
      if (response.id != null) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
        navigation.navigate("Login");
      } else {
        Alert.alert("Erro", response);
      }
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro ao cadastrar usuário");
    }
  };

  const [data, setData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);


  return (
    <View style={styles.container}>
      <Title title="Register" />
      <TextInput
        label="Nome"
        placeholder="Digite seu nome"
        onValueChange={setNome}
      />
      <Text style={styles.label}>Data de Nascimento</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateInput}>
          {data ? data.toLocaleDateString() : "Selecione a data de nascimento"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setData(date);
            }
          }}
        />
      )}
      <TextInput
        label="Email"
        placeholder="Digite seu email"
        onValueChange={setEmail}
      />
      <TextInput
        label="Senha"
        placeholder="Digite sua senha"
        onValueChange={setSenha}
      />
      <TextInput
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        onValueChange={setConfirmSenha}
      />
      <Pressable text="Entrar" action={handleRegister} />
      <Text style={styles.register} onPress={() => navigation.navigate("Login")}>Voltar ao Login</Text>
    </View>
  );
}
