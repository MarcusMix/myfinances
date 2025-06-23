import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 30,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
  },
  subContainerConsultar: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 40,
    marginBottom: 40,
  },
  botoesCadastrar: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'nowrap',
  },
  botoesCadastrarUnidade: {
    flex: 1,
  },
  erro: {
    color: 'red',
  },
});
