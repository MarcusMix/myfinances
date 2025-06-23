import {Modal, ScrollView, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import {styles} from "./AppIconeModalStyle";

interface AppModalProps {
  icone: [string, any];
  modalVisible: boolean;
  setModalVisible: any;
  title: string;
  iconeLista: string[];
}

export default function AppIconeModal({icone, modalVisible, setModalVisible, title, iconeLista}: AppModalProps) {


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
          <View style={styles.grade}>
          {iconeLista.map((item, index) => (
            <Ionicons name={item} size={50} color={"black"} key={index} onPress={() => {
              icone[1](item)
              setModalVisible(!modalVisible)
            }}/>
          ))}
          </View>

        </View>
      </View>
    </Modal>
  );
}