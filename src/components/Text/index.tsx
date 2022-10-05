import { Text as T } from 'react-native';
import styles from './styles';

export function Text({ children }) {
    return (
        <T style={styles.text}>{children}</T>
    );
}