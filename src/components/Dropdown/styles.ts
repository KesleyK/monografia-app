import { StyleSheet } from 'react-native'
import { DefaultStyles } from '../../styles/global';

export default StyleSheet.create({
    inputBox: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 23,
        marginBottom: 10,
        textAlignVertical: "center",
    },
    placeholder: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    dropdown: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        width: "100%",
        marginBottom: 25,
        borderRadius: 5
    },
    dropdownItem: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        marginLeft: "5%",
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: DefaultStyles.BACKGROUND_COLOR
    },
    dropdownItemText: {
        color: DefaultStyles.PRIMARY_COLOR
    }
});