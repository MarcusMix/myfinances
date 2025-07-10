import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./DespesaCardStyle";
import { formatarMoeda } from "../../services/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import {
  getMesAtual,
  getAnoAtual,
  isMesAnoIgualOuPosteriorADataAtual,
} from "../../services/utils";

interface DespesaCardProps {
  descricao: string;
  valor: number;
  mes: number;
  ano: number;
  editAction?: () => void;
  removeAction?: () => void;
  categoria: string;
}

export default function DespesaCard({
  descricao,
  valor,
  removeAction,
  editAction,
  categoria,
  mes,
  ano,
}: DespesaCardProps) {
  // Map of category values to human-readable names
  const categoriaNomes = {
    casa: "Casa",
    mercado: "Mercado",
    lazer: "Lazer",
    transporte: "Transporte",
    saude: "Saúde",
    educacao: "Educação",
    restaurantes: "Restaurantes",
    vestuario: "Vestuário",
    utilidades: "Utilidades",
    viagem: "Viagem",
    seguros: "Seguros",
    presentes: "Presentes",
    tecnologia: "Tecnologia",
    cuidados_pessoais: "Cuidados Pessoais",
    diversos: "Diversos",
  };

  const categoriaNome = categoria ? categoriaNomes[categoria] || categoria : "";

  // Get the appropriate icon for the category
  const getCategoryIcon = () => {
    const iconMap = {
      casa: "home-outline",
      mercado: "cart-outline",
      lazer: "game-controller-outline",
      transporte: "car-outline",
      saude: "medical-outline",
      educacao: "school-outline",
      restaurantes: "restaurant-outline",
      vestuario: "shirt-outline",
      utilidades: "bulb-outline",
      viagem: "airplane-outline",
      seguros: "shield-checkmark-outline",
      presentes: "gift-outline",
      tecnologia: "hardware-chip-outline",
      cuidados_pessoais: "heart-outline",
      diversos: "list-outline",
    };

    return iconMap[categoria] || "list-outline";
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowConteudo}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={getCategoryIcon()} size={24} color="#4285F4" />
        </View>
        <View style={styles.columnDescricaoValor}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.categoria}>{categoriaNome}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.valor}>{formatarMoeda(valor)}</Text>
        {isMesAnoIgualOuPosteriorADataAtual(mes, ano) ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={editAction}>
              <Ionicons name="pencil" size={20} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={removeAction}>
              <Ionicons name="trash-outline" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}
