import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  valor: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black'
  },
  container: {
    borderRadius: 8,
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',
  },
  rowValor: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 8,
  },
});
