import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    minHeight: 200,
    width: "80%",
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  modalSubText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  botoes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  botao: {
    flex: 1,
  },
});
