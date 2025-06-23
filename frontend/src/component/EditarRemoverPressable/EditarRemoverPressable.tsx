import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { styles } from "./EditarRemoverPressableStyle";

/*
 * https://reactnative.dev/docs/pressable
 */

interface EditarRemoverPressableProps {
  editAction?: (event: GestureResponderEvent) => void;
  removeAction?: (event: GestureResponderEvent) => void;
}

export default function EditarRemoverPressable({ editAction, removeAction }: EditarRemoverPressableProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={editAction}>
        <Text style={styles.text}>Editar</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={removeAction}>
        <Text style={styles.text}>Remover</Text>
      </Pressable>
    </View>
  );
}