import {Modal, Text, View} from "react-native";
import * as React from "react";
import {styles} from "./AppRemoverModalStyle";
import AppPressable from "../appPressable/AppPressable";

/*
https://reactnative.dev/docs/modal
 */


interface AppModalProps {
  modalVisible: boolean;
  setModalVisible: any;
  title: string;
  name: string;
  removerAction: any;
}

export default function AppRemoverModal({modalVisible, setModalVisible, title, name, removerAction}: AppModalProps) {


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text>{name}</Text>
          <View style={styles.rowBotoes}>
            <View>
              <AppPressable text={"Cancelar"} action={() => setModalVisible(false)}/>
            </View>
            <View>
              <AppPressable text={"Remover"} action={removerAction}/>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}