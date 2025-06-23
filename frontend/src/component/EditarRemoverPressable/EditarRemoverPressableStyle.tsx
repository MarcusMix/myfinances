import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    height: 50,
    flex: 1,
    backgroundColor: "gray",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: "white",
    fontSize: 18,
  }
});
