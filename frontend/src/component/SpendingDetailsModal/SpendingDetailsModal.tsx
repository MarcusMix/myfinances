import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatarMoeda } from "../../services/utils";

interface CategorySpending {
  category: string;
  categoryName: string;
  amount: number;
  icon?: string;
  color?: string;
}

interface SpendingDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  totalSpent: number;
  limit: number;
  categorySpending: CategorySpending[];
}

const SpendingDetailsModal: React.FC<SpendingDetailsModalProps> = ({
  visible,
  onClose,
  totalSpent,
  limit,
  categorySpending,
}) => {
  const saved = limit - totalSpent > 0 ? limit - totalSpent : 0;
  const exceededBy = totalSpent > limit ? totalSpent - limit : 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detalhes de Gastos</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Resumo Total</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Gasto Total:</Text>
                <Text style={styles.summaryValue}>
                  {formatarMoeda(totalSpent)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Limite Mensal:</Text>
                <Text style={styles.summaryValue}>{formatarMoeda(limit)}</Text>
              </View>

              {saved > 0 && (
                <View style={[styles.summaryRow, styles.savedRow]}>
                  <Text style={styles.summaryLabel}>Economizado:</Text>
                  <Text style={styles.savedValue}>{formatarMoeda(saved)}</Text>
                </View>
              )}

              {exceededBy > 0 && (
                <View style={[styles.summaryRow, styles.exceededRow]}>
                  <Text style={styles.summaryLabel}>Excedido em:</Text>
                  <Text style={styles.exceededValue}>
                    {formatarMoeda(exceededBy)}
                  </Text>
                </View>
              )}

              <View style={styles.totalProgressBarContainer}>
                <View
                  style={[
                    styles.totalProgressBar,
                    {
                      width: `${Math.min((totalSpent / limit) * 100, 100)}%`,
                      backgroundColor:
                        totalSpent > limit ? "#ff6b6b" : "#66bb6a",
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.progressText,
                  totalSpent > limit ? styles.exceededText : styles.normalText,
                ]}
              >
                {totalSpent > limit
                  ? "Você ultrapassou seu limite mensal"
                  : `${((totalSpent / limit) * 100).toFixed(1)}% do limite utilizado`}
              </Text>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Gastos por Categoria</Text>

              {categorySpending.length === 0 ? (
                <Text style={styles.noDataText}>
                  Nenhum gasto registrado neste período
                </Text>
              ) : (
                categorySpending.map((category, index) => (
                  <View key={index} style={styles.categoryItem}>
                    <View style={styles.categoryHeader}>
                      <View style={styles.categoryNameContainer}>
                        {category.icon && (
                          <Ionicons
                            name={category.icon}
                            size={20}
                            color="#555"
                            style={styles.categoryIcon}
                          />
                        )}
                        <Text style={styles.categoryName}>
                          {category.categoryName}
                        </Text>
                      </View>
                      <Text style={styles.categoryAmount}>
                        {formatarMoeda(category.amount)}
                      </Text>
                    </View>

                    <View style={styles.categoryProgressContainer}>
                      <View
                        style={[
                          styles.categoryProgressBar,
                          {
                            width: `${Math.min((category.amount / limit) * 100, 100)}%`,
                            backgroundColor: category.color || "#4ECDC4",
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.categoryPercentage}>
                      {((category.amount / limit) * 100).toFixed(1)}% do limite
                    </Text>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: "80%",
    minHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    marginTop: 10,
  },
  summaryContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#555",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  savedRow: {
    marginTop: 5,
  },
  savedValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#66bb6a",
  },
  exceededRow: {
    marginTop: 5,
  },
  exceededValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
  totalProgressBarContainer: {
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  totalProgressBar: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "right",
    fontWeight: "500",
  },
  normalText: {
    color: "#4CAF50",
  },
  exceededText: {
    color: "#F44336",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  categoryItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  categoryProgressContainer: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  categoryProgressBar: {
    height: "100%",
    borderRadius: 4,
  },
  categoryPercentage: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
    textAlign: "right",
    fontWeight: "500",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default SpendingDetailsModal;
