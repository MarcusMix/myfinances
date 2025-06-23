import {Text, View} from "react-native";
import {styles} from "./AppDespesaCardStyle";
import {formatarMoeda} from "../../services/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import AppEditarRemoverPressable from "../appEditarRemoverPressables/AppEditarRemoverPressable";
import {getMesAtual, getAnoAtual, isMesAnoIgualOuPosteriorADataAtual} from "../../services/utils";

interface AppinputProps {
  descricao: string;
  valor: number;
  mes: number;
  ano: number;
  editAction?: () => void;
  removeAction?: () => void;
  icone: string;
}

export default function AppDespesaCard({descricao, valor, removeAction, editAction, icone, mes, ano}: AppinputProps) {

  return (
    <View style={styles.container}>
      <View style={styles.rowConteudo}>
        <Ionicons name={icone} size={40} color={"black"}/>
        <View style={styles.columnDescricaoValor}>
          <Text style={styles.descricao}>
            {descricao}
          </Text>
          <Text style={styles.valor}>
            {formatarMoeda(valor)}
          </Text>
        </View>
      </View>
      {
        isMesAnoIgualOuPosteriorADataAtual(mes, ano) ?
          <AppEditarRemoverPressable editAction={editAction} removeAction={removeAction}/>
          : null
      }


    </View>
  );
}