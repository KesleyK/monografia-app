import { StyleSheet } from 'react-native'
import { DefaultStyles } from '../../styles/global';

export default StyleSheet.create({
    button: {
        backgroundColor: DefaultStyles.PRIMARY_COLOR,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    fullWidthButton: {
        width: "100%"
    },
    title: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});
