import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "./ModalButtonsStyle";

interface ModalButtonsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
  cancelColor?: string;
  confirmColor?: string;
}

export default function ModalButtons({
  onCancel,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  cancelColor,
  confirmColor,
}: ModalButtonsProps) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.cancelButton,
          cancelColor ? { backgroundColor: cancelColor } : {},
        ]}
        onPress={onCancel}
      >
        <Text style={[styles.buttonText, styles.cancelText]}>{cancelText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.confirmButton,
          confirmColor ? { backgroundColor: confirmColor } : {},
        ]}
        onPress={onConfirm}
      >
        <Text style={[styles.buttonText, styles.confirmText]}>
          {confirmText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
