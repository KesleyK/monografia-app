import { View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function ProgressBar({ style, total, progress, subject = null as string }) {
    const fill = progress / total * 100;

    return (
        <View>
            <View style={{ ...styles.bar, ...style }} >
                <View style={{ ...styles.filled, width: `${fill}%` }} />
            </View>
            {subject === null ? null :
                <Text style={styles.subject}>{`${progress}/${total} ${subject}`}</Text>
            }
        </View>
    );
}