import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 24
    },
    title: {
        color: '#5b5bd6',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1
    },
    input: {
        minHeight: 52,
        marginTop: 28,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#d0d5dd',
        borderRadius: 12,
        backgroundColor: '#FFF',
        color: '#172033',
        fontSize: 16
    },
    primaryButton: {
        minHeight: 52,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#5b6bd6'
    },
    primaryColorText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    secondaryButton: {
        minHeight: 48,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d0d5dd',
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 18
    },
    secondaryButtonText: {
        color: '#344054',
        fontSize: 15,
        fontWeight: '700'
    },
    dangerButton : {
        minHeight: 48,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#d92d20',
        paddingHorizontal: 18
    },
    message: {
        marginTop: 18,
        color: '#b42318',
        fontSize: 14
    }
});