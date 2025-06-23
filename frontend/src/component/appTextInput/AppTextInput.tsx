import {Text, TextInput, View} from "react-native";
import {styles} from "./AppTextInputStyle";


interface AppinputProps {
  text?: string;
  placeholder?: string;
  editable?: boolean;
  label?: string;
  onValueChange: any;
}

export default function AppTextInput({
                                       text,
                                       onValueChange,
                                       placeholder,
                                       editable = true,
                                       label
                                     }: AppinputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        editable={editable}
        value={text}
        placeholder={placeholder}
        onChangeText={onValueChange}
        style={styles.input}
      />
    </View>
  );
}