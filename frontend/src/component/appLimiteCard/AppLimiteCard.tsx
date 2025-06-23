import {Text, TextInput, View} from "react-native";
import {styles} from "./AppLimiteCardStyle";
import {formatarMoeda, isMesAnoIgualOuPosteriorADataAtual} from "../../services/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import AppEditarRemoverPressable from "../appEditarRemoverPressables/AppEditarRemoverPressable";

interface AppinputProps {
  valor: number;
  editAction?: () => void;
  removeAction?: () => void;
  mes: number;
  ano: number;
}

export default function AppLimiteCard({valor, removeAction, editAction, mes, ano}: AppinputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.rowValor}>
        <Ionicons name={"wallet"} size={40} color={"black"}/>
        <Text style={styles.valor}>
          {formatarMoeda(valor)}
        </Text>
      </View>
      {
        isMesAnoIgualOuPosteriorADataAtual(mes, ano) ?
          <AppEditarRemoverPressable editAction={editAction} removeAction={removeAction}/>
          : null
      }
    </View>
  );
}