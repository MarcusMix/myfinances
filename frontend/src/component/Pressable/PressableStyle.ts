import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    button: {
        height: 70,
        width: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 16,
        borderColor: colors.primaryDark,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    }
}); 