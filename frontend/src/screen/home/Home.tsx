import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDespesasPorMes, getTotalMes } from "../../services/despesaService";
import { getLimiteValorPorMes } from "../../services/limiteService";
import { colors } from "../../theme/colors";
import { HomeStyle } from "./HomeStyle";
import Title from "../../component/Title/Title";
import Pressable from "../../component/Pressable/Pressable";
import { useAuth } from "../../context/AuthContext";
import { getAnoAtual, getMesAtual, MESES } from "../../services/utils";
import SelectMesAnoInput from "../../component/SelectMesAnoInput/SelectMesAnoInput";
import { getUsuarioLogado } from "../../services/usuarioService";
import SpendingDetailsModal from "../../component/SpendingDetailsModal/SpendingDetailsModal";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home() {
  const navigation = useNavigation<any>();
  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0);
  const [limite, setLimite] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mesConsulta, setMesConsulta] = useState(getMesAtual().toString());
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual().toString());
  const mesListaConsulta = MESES;
  const anoListaConsulta = ["2025", "2026"];
  const [progresso, setProgresso] = useState(0);
  const [meta, setMeta] = useState(0);
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    dt_nascimento: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [categorySpendings, setCategorySpendings] = useState([]);

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
      const despesasData = await getDespesasPorMes(
        Number(mesConsulta),
        Number(anoConsulta),
      );
      const usuario_logado = await getUsuarioLogado();

      setMeta(response_limite || 0);
      setProgresso(response_total || 0);
      setDespesas(despesasData || []);

      // Process category data
      processCategoryData(despesasData);

      if (usuario_logado) {
        setUsuario(usuario_logado);
      }
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    } finally {
      setLoading(false);
    }
  };

  const processCategoryData = (despesasData) => {
    // Categorias com seus ícones e cores
    const categoryIcons = {
      casa: { icon: "home-outline", color: "#FF6B6B", name: "Casa" },
      mercado: { icon: "cart-outline", color: "#4ECDC4", name: "Mercado" },
      lazer: {
        icon: "game-controller-outline",
        color: "#45B7D1",
        name: "Lazer",
      },
      transporte: { icon: "car-outline", color: "#96CEB4", name: "Transporte" },
      saude: { icon: "medical-outline", color: "#FFEAA7", name: "Saúde" },
      educacao: { icon: "school-outline", color: "#DDA0DD", name: "Educação" },
      restaurantes: {
        icon: "restaurant-outline",
        color: "#98D8C8",
        name: "Restaurantes",
      },
      vestuario: { icon: "shirt-outline", color: "#F7DC6F", name: "Vestuário" },
      utilidades: {
        icon: "bulb-outline",
        color: "#BB8FCE",
        name: "Utilidades",
      },
      viagem: { icon: "airplane-outline", color: "#85C1E9", name: "Viagem" },
      seguros: {
        icon: "shield-checkmark-outline",
        color: "#FF9999",
        name: "Seguros",
      },
      presentes: { icon: "gift-outline", color: "#FFCC99", name: "Presentes" },
      tecnologia: {
        icon: "hardware-chip-outline",
        color: "#99FF99",
        name: "Tecnologia",
      },
      cuidados_pessoais: {
        icon: "heart-outline",
        color: "#9999FF",
        name: "Cuidados Pessoais",
      },
      diversos: { icon: "list-outline", color: "#CC99FF", name: "Diversos" },
    };

    // Agrupar despesas por categoria
    const categorySummary = {};

    despesasData.forEach((despesa) => {
      const categoria = despesa.categoria || "diversos";
      if (!categorySummary[categoria]) {
        categorySummary[categoria] = {
          amount: 0,
          category: categoria,
          categoryName: categoryIcons[categoria]?.name || categoria,
          icon: categoryIcons[categoria]?.icon || "list-outline",
          color: categoryIcons[categoria]?.color || "#999999",
        };
      }
      categorySummary[categoria].amount += despesa.valor;
    });

    // Converter para array e ordenar por valor
    const categoryArray = Object.values(categorySummary);
    categoryArray.sort((a, b) => b.amount - a.amount);

    setCategorySpendings(categoryArray);
  };

  useEffect(() => {
    mountPage();

    const unsubscribe = navigation.addListener("focus", () => {
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
        <Title title="Carregando..." />
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
      <Title title={`Olá, ${usuario.nome} 👋`} />
      <Text style={HomeStyle.subtitle}>É bom te ver por aqui!</Text>

      <View style={HomeStyle.selectContainer}>
        <SelectMesAnoInput
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

      <TouchableOpacity
        style={HomeStyle.progressSection}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={HomeStyle.progressoText}>Progresso</Text>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#666"
            style={{ marginLeft: 5 }}
          />
        </View>
        <Text style={HomeStyle.metaText}>
          R$ {progresso.toFixed(2)}/R$ {meta.toFixed(2)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={HomeStyle.progressBarContainer}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View
          style={[
            HomeStyle.progressBar,
            {
              width:
                meta > 0 ? `${Math.min((progresso / meta) * 100, 100)}%` : "0%",
              backgroundColor: progresso > meta ? "#ff6b6b" : "#66bb6a",
            },
          ]}
        />
        <Text
          style={{
            fontSize: 12,
            color: "#666",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Toque para ver detalhes
        </Text>
      </TouchableOpacity>

      <SpendingDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        totalSpent={progresso}
        limit={meta}
        categorySpending={categorySpendings}
      />
    </ScrollView>
  );
}
