import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 4,
    fontSize: 16,
    color: colors.text
  },
  input: {
    height: 46,
    width: '100%',
    borderRadius: 6,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    padding: 8,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: colors.background
  },
});
