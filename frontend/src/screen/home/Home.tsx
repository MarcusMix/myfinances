import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDespesasPorMes, getTotalMes } from "../../services/despesaService";
import { getLimiteValorPorMes } from "../../services/limiteService";
import { colors } from "../../theme/colors";
import { HomeStyle } from "./HomeStyle";
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import { useAuth } from "../../context/AuthContext";
import { getAnoAtual, getMesAtual, MESES } from "../../services/utils";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import { getUsuarioLogado } from "../../services/usuarioService";

export default function Home() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0);
  const [limite, setLimite] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mesConsulta, setMesConsulta] = useState(getMesAtual().toString());
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual().toString());
  const mesListaConsulta = MESES;
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"];
  const [progresso, setProgresso] = useState(0);
  const [meta, setMeta] = useState(0);
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    dt_nascimento: "",
  });

  const carregarDados = async () => {
    try {
      setLoading(true);
      const dataAtual = new Date();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();

      const [despesasData, totalData, limiteData] = await Promise.all([
        getDespesasPorMes(mes, ano),
        getTotalMes(mes, ano),
        getLimiteValorPorMes(mes, ano),
      ]);

      setDespesas(despesasData);
      setTotal(totalData || 0);
      setLimite(limiteData || 0);
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const mountPage = async () => {
    try {
      setLoading(true);
      const response_limite = await getLimiteValorPorMes(
        Number(mesConsulta),
        Number(anoConsulta),
      );
      const response_total = await getTotalMes(
        Number(mesConsulta),
        Number(anoConsulta),
      );
      const usuario_logado = await getUsuarioLogado();
      setMeta(response_limite || 0);
      setProgresso(response_total || 0);
      if (usuario_logado) {
        setUsuario(usuario_logado);
      }
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    mountPage();

    const unsubscribe = navigation.addListener('focus', () => {
      mountPage();
    });

    return unsubscribe;
  }, [mesConsulta, anoConsulta, navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    mountPage().finally(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <View style={HomeStyle.container}>
        <AppTitle title="Carregando..." />
      </View>
    );
  }

  let emoji = "😊";
  let message = "Você conseguiu";

  if (meta === 0) {
    emoji = "🤔";
    message = "Nada cadastrado";
  } else if (progresso < meta) {
    emoji = "🤩";
    message = `Você economizou ${meta - progresso} reais!!`;
  } else if (progresso >= meta) {
    emoji = "😢";
    message = "Se ferrou";
  }

  return (
    <ScrollView
      style={HomeStyle.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
    >
      <AppTitle title={`Olá, ${usuario.nome} 👋`} />
      <Text style={HomeStyle.subtitle}>É bom te ver por aqui!</Text>

      <View style={HomeStyle.selectContainer}>
        <AppSelectMesAnoInput
          label={"Selecione um período"}
          editable={true}
          mes={mesConsulta}
          mesLista={mesListaConsulta}
          onMesChange={setMesConsulta}
          ano={anoConsulta}
          anoLista={anoListaConsulta}
          onAnoChange={setAnoConsulta}
        />
      </View>

      <View style={HomeStyle.emojiContainer}>
        <View style={HomeStyle.emojiBackground}>
          <Text style={HomeStyle.emoji}>{emoji}</Text>
          <Text style={HomeStyle.emojiText}>{message}</Text>
        </View>
      </View>

      <View style={HomeStyle.progressSection}>
        <Text style={HomeStyle.progressoText}>Progresso</Text>
        <Text style={HomeStyle.metaText}>
          R$ {progresso.toFixed(2)}/R$ {meta.toFixed(2)}
        </Text>
      </View>

      <View style={HomeStyle.progressBarContainer}>
        <View
          style={[
            HomeStyle.progressBar,
            { width: `${(progresso / meta) * 100}%` },
          ]}
        ></View>
      </View>
    </ScrollView>
  );
}

