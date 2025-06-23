import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  columnDescricaoValor: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 2,
    padding: 8,
  },
  rowConteudo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  }
});
