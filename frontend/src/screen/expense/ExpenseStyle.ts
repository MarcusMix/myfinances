import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 12,
  },
  subContainerHistorico: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
    marginTop: 40,
    marginBottom: 40,
  },
  rowIconeDescricao: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 0,
  },
  colIcone: {
    width: 46,
  },
  colDescricao: {
    flex: 1,
    gap: 0,
  },
  botoesCadastrar: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "nowrap",
  },
  botoesCadastrarUnidade: {
    flex: 1,
  },
  erro: {
    color: "red",
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});
