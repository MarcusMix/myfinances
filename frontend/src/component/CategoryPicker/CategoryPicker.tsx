import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Category {
  name: string;
  value: string;
  icon?: string;
}

interface CategoryPickerProps {
  label?: string;
  selectedValue: string;
  categories: Category[];
  onValueChange: (itemValue: string) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  label = "Categoria",
  selectedValue,
  categories,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#333"
          mode="dropdown"
          prompt=""
        >
          {categories.map((category) => (
            <Picker.Item
              key={category.value}
              label={category.name}
              value={category.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
  },
  label: {
    textAlign: "left",
    width: "100%",
    marginBottom: 4,
    fontSize: 16,
    color: "#333",
    fontWeight: "normal",
    paddingBottom: 0,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
    height: 46,
    width: "100%",
    marginBottom: 0,
    overflow: "hidden",
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: 46,
    color: "#333",
    marginTop: -3,
  },
});

export default CategoryPicker;
