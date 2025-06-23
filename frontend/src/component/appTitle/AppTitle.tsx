import { Text, TextInput, View } from "react-native";
import { styles } from "./AppTitleStyle";

interface AppTitleProps {
  title: string;
}

export default function AppTitle({ title }: AppTitleProps) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}