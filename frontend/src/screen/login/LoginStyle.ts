import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: colors.background,
        gap: 30,
    },
    register: {
        color: colors.primary,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: 20,
    },
}); 