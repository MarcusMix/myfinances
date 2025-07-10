import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#ff7c00",
  },
  confirmButton: {
    backgroundColor: colors.info,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  cancelText: {
    color: "#D32F2F",
  },
  confirmText: {
    color: "#FFFFFF",
  },
});
