import { Pressable, Text, View } from "react-native";
import { styles } from "./IconeInputStyle";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IconeInputProps {
  icone?: string;
  onPress?: () => void;
  label?: string;
}

export default function IconeInput({ icone, onPress, label }: IconeInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <Pressable style={styles.input} onPress={onPress}>
        <Ionicons name={icone} size={26} color={"black"} />
      </Pressable>
    </View>
  );
}