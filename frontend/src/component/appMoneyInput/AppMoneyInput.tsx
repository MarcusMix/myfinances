import {Text, View} from "react-native";
import {styles} from "./AppMoneyInputStyle";
import CurrencyInput from 'react-native-currency-input';

/*
 * Biblioteca react-native-currency-input
 * documentação: https://www.npmjs.com/package/react-native-currency-input
 *
 * retorna o valor no tipo ``number`` sem formatação.
 */

interface AppMoneyProps {
  value?: number;
  onValueChange: any;
  editable?: boolean;
  label?: string;
}

export default function AppMoneyInput({
                                        value,
                                        onValueChange,
                                        editable = true,
                                        label
                                      }: AppMoneyProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <CurrencyInput
        value={value}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        onChangeValue={onValueChange}
        style={styles.input}
        editable={editable}
      />
    </View>
  );
}