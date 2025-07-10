import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#f8f8f8",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  cardContent: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  despesaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  despesaDescricao: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  despesaValor: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  noData: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    padding: 16,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  selectContainer: {
    marginBottom: 20,
  },
  emojiContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  emojiBackground: {
    backgroundColor: "#66bb6a",
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  emoji: {
    fontSize: 80,
  },
  emojiText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  progressSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  progressoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  metaText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  progressBarContainer: {
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#66bb6a",
    borderRadius: 8,
  },
});
