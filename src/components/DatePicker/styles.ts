import { StyleSheet } from 'react-native'
import { DefaultStyles } from '../../styles';

export default StyleSheet.create({
    picker: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 23,
        marginBottom: 10,
        justifyContent: "center",
    },
    placeholder: {
        color: DefaultStyles.PRIMARY_COLOR,
    }
});
