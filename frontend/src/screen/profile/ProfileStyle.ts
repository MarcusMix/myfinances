import { StyleSheet } from 'react-native';
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: colors.background,
    gap: 30,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});