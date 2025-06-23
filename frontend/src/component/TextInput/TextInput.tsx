import { Text, TextInput as NativeTextInput, View } from "react-native";
import { styles } from "./TextInputStyle";
import { useState } from "react";

/*
* https://reactnative.dev/docs/textinput
*/

interface TextInputProps {
  text?: string;
  onValueChange: any;
  editable?: boolean;
  placeholder?: string;
  label: string;
}

export default function TextInput({ text, onValueChange, editable = true, placeholder, label }: TextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <NativeTextInput
        style={styles.input}
        onChangeText={onValueChange}
        value={text}
        placeholder={placeholder}
        editable={editable}
      />
    </View>
  );
}