import { Text, TextInput, View } from "react-native";
import { styles } from "./LimiteCardStyle";
import { formatarMoeda, isMesAnoIgualOuPosteriorADataAtual } from "../../services/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import EditarRemoverPressable from "../EditarRemoverPressable/EditarRemoverPressable";

interface LimiteCardProps {
  valor: number;
  editAction?: () => void;
  removeAction?: () => void;
  mes: number;
  ano: number;
}

export default function LimiteCard({ valor, removeAction, editAction, mes, ano }: LimiteCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.rowValor}>
        <Ionicons name={"wallet"} size={40} color={"black"} />
        <Text style={styles.valor}>
          {formatarMoeda(valor)}
        </Text>
      </View>
      {
        isMesAnoIgualOuPosteriorADataAtual(mes, ano) ?
          <EditarRemoverPressable editAction={editAction} removeAction={removeAction} />
          : null
      }
    </View>
  );
}