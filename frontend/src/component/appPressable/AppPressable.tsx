import { GestureResponderEvent, Pressable, Text } from "react-native";
import { styles } from "./AppPressableStyle";

/*
 * https://reactnative.dev/docs/pressable
 */

interface AppPressableProps {
  text: string;
  action?: (event: GestureResponderEvent) => void;
}

export default function AppPressable({ text, action }: AppPressableProps) {
  return (
    <Pressable style={styles.button} onPress={action}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}