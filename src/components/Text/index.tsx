import { Text as T } from 'react-native';
import styles from './styles';

export function Text({ style = null, children }) {
    return <T style={{ ...styles.text, ...style }}>{children}</T>
}