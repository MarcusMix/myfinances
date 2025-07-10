import { Modal, Text, View } from "react-native";
import * as React from "react";
import { styles } from "./RemoverModalStyle";
import ModalButtons from "../ModalButtons/ModalButtons";

/*
https://reactnative.dev/docs/modal
 */

interface RemoverModalProps {
  modalVisible: boolean;
  setModalVisible: any;
  removerAction: () => void;
  title: string;
  name: string;
}

export default function RemoverModal({
  modalVisible,
  setModalVisible,
  title,
  name,
  removerAction,
}: RemoverModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={styles.modalSubText}>{name}</Text>

            <ModalButtons
              onCancel={() => setModalVisible(!modalVisible)}
              onConfirm={removerAction}
              cancelText="Cancelar"
              confirmText="Confirmar"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
