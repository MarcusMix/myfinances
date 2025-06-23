import { Text } from "react-native";
import { styles } from "./TitleStyle";

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}