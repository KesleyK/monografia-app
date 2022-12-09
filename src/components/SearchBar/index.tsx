import React, { useState } from "react";
import { TextInput, View} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import styles from "./styles";

export function SearchBar({ style, searchPhrase, setSearchPhrase }) {
    return (
        <View style={{ ...styles.container, ...style }}>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar"
                value={searchPhrase}
                onChangeText={setSearchPhrase}
            />

            {searchPhrase.length ? (
                <Entypo
                    name="cross"
                    size={20}
                    color="black"
                    onPress={() => setSearchPhrase("")}
                />
            ) : (
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={styles.searchIcon}
                />
            )}
        </View>
    );
}
