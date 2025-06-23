import { Modal, ScrollView, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import { styles } from "./IconeModalStyle";

interface IconeModalProps {
  icone: [string, any];
  modalVisible: boolean;
  setModalVisible: any;
  title: string;
  iconeLista: string[];
}

export default function IconeModal({ icone, modalVisible, setModalVisible, title, iconeLista }: IconeModalProps) {
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
            <Text style={styles.title}>{title}</Text>
            <ScrollView>
              <View style={styles.grade}>
                {iconeLista.map((item, index) =>
                  <Ionicons key={index} name={item} size={40} color={"black"} onPress={() => {
                    icone[1](item)
                    setModalVisible(!modalVisible)
                  }} />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}