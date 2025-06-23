import {Text, View} from "react-native";
import {styles} from "./AppSelectMesAnoInputStyle";
import {Picker} from '@react-native-picker/picker';
import {isMesAnoIgualOuPosteriorADataAtual} from "../../services/utils";

/*
https://github.com/react-native-picker/picker
 */


interface Month {
  name: string;
  value: number;
}

interface AppinputProps {
  label: string;
  editable: boolean;
  mes: string;
  mesLista: Month[];
  onMesChange: (value: string) => void;
  ano: string;
  anoLista: string[];
  onAnoChange: (value: string) => void;
  bloquearDatasAnteriores?: boolean;
}

export default function AppSelectMesAnoInput({label, editable, mes, mesLista, onMesChange, ano, anoLista, onAnoChange, bloquearDatasAnteriores=false}: AppinputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputMesContainer}>
          <Picker
            selectedValue={mes}
            onValueChange={(itemValue, itemIndex) =>
              onMesChange(itemValue)
            }
            enabled={editable}>
            {mesLista.map((item) => (
              bloquearDatasAnteriores && !isMesAnoIgualOuPosteriorADataAtual(item.value, parseInt(ano)) ?
              <Picker.Item label={item.name} value={item.value.toString()} key={item.value} enabled={false} style={{color: "gray"}}/> :
              <Picker.Item label={item.name} value={item.value.toString()} key={item.value}/>
            ))}
          </Picker>
        </View>
        <View style={styles.inputAnoContainer}>
          <Picker
            selectedValue={ano}
            onValueChange={(itemValue, itemIndex) =>
              onAnoChange(itemValue)
            }
            enabled={editable}>
            {anoLista.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index}/>
            })}
          </Picker>
        </View>
      </View>
    </View>
  );
}