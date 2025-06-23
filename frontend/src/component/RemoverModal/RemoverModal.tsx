import { Modal, Text, View } from "react-native";
import * as React from "react";
import { styles } from "./RemoverModalStyle";
import Pressable from "../Pressable/Pressable";

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

export default function RemoverModal({ modalVisible, setModalVisible, title, name, removerAction }: RemoverModalProps) {


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={styles.modalSubText}>{name}</Text>

            <View style={styles.botoes}>
              <View style={styles.botao}>
                <Pressable
                  text={"Cancelar"}
                  action={() => setModalVisible(!modalVisible)}
                />
              </View>
              <View style={styles.botao}>
                <Pressable
                  text={"Confirmar"}
                  action={removerAction} />
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}