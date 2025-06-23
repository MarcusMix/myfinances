import {Pressable, Text, View} from "react-native";
import {styles} from "./AppIconeInputStyle";
import Ionicons from "@expo/vector-icons/Ionicons";


interface AppinputProps {
  icone: string;
  label?: string;
  onPress?: () => void;
}

export default function AppIconeInput({icone, label, onPress}: AppinputProps) {
  return (

    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        <Ionicons name={icone} size={26} color={"black"}/>
      </Pressable>
    </View>
  );
}