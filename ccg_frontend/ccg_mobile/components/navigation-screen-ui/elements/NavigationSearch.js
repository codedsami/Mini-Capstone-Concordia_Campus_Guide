import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/NavigationModesStyles';

const NavigationSearch = ({ startAddress, destinationAddress, onStartSearching }) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color="#800020" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Start Address"
                    value={startAddress}
                    onChangeText={(text) => onStartSearching({ startAddress: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color="#800020" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Destination Address"
                    value={destinationAddress}
                    onChangeText={(text) => onStartSearching({ destinationAddress: text })}
                />
            </View>
        </View>
    );
};

export default NavigationSearch;
