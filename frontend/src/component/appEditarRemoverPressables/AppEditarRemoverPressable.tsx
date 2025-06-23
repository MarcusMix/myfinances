import {GestureResponderEvent, Pressable, Text, View} from "react-native";
import {styles} from "./AppEditarRemoverPressableStyle";

/*
 * https://reactnative.dev/docs/pressable
 */

interface AppPressableProps {
  editAction?: (event: GestureResponderEvent) => void;
  removeAction?: (event: GestureResponderEvent) => void;
}

export default function AppEditarRemoverPressable({editAction, removeAction}: AppPressableProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={(e) => removeAction(e)}>
        <Text style={styles.text}>{'Remover'}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={(e) => editAction(e)}>
        <Text style={styles.text}>{'Editar'}</Text>
      </Pressable>
    </View>
  )
}