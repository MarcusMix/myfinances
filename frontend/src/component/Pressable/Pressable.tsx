import { GestureResponderEvent, Pressable as RNPressable, Text } from "react-native";
import { styles } from "./PressableStyle";

/*
 * https://reactnative.dev/docs/pressable
 */

interface PressableProps {
  text: string;
  action?: (event: GestureResponderEvent) => void;
}

export default function Pressable({ text, action }: PressableProps) {
  return (
    <RNPressable style={styles.button} onPress={action}>
      <Text style={styles.text}>{text}</Text>
    </RNPressable>
  );
}