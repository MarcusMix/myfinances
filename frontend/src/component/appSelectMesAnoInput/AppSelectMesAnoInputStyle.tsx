import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 4,
    fontSize: 16,
    color: 'black'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 8
  },
  inputMesContainer: {
    borderRadius: 6,
    borderColor: 'gray',
    backgroundColor: 'white',
    height: 52,
    flexBasis: '60%',
    borderWidth: 1,
    color: "black",
    fontSize: 16,
    textAlign: "left",
  },
  inputAnoContainer: {
    borderRadius: 6,
    borderColor: 'gray',
    backgroundColor: 'white',
    height: 52,
    flex: 1,
    borderWidth: 1,
    color: "black",
    fontSize: 16,
    textAlign: "left",
  }
});
