import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const NavigationSearch = ({ startAddress, allLocations, destinationAddress, onModifyAddress}) => {
    const navigation = useNavigation();
    const rotateAnim = useRef(new Animated.Value(0)).current; // Animation reference

    const handlePress = (type) => {
        navigation.navigate("Search", {
            allLocations,
            type,
            onGoBack: (selectedAddress) =>
                type === "start"
                    ? onModifyAddress("start", selectedAddress)
                    : onModifyAddress("destination", selectedAddress),
        });
    };

    const handleSwap = () => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            rotateAnim.setValue(0);
        });

        onModifyAddress("start", allLocations.find(location => location.civic_address === destinationAddress));
        onModifyAddress("destination", allLocations.find(location => location.civic_address === startAddress));
    };

    return (
        <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color="#800020" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Start Address"
                    value={startAddress}
                    onChangeText={(text) => onStartNavigation(text)}
                    onFocus={() => handlePress("start")}
                />
            </View>

            {/* Swap Button (Correctly Positioned in Between) */}
            <View style={styles.swapButtonContainer}>
                <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: rotateAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg']
                                    })
                                }
                            ]
                        }}
                    >
                        <Ionicons name="swap-vertical" size={24} color="white" />
                    </Animated.View>

                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color="#800020" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Destination Address"
                    value={destinationAddress}
                    onChangeText={(text) => onStartNavigation(text)}
                    onFocus={() => handlePress("destination")}
                />
            </View>
        </View>
    );
};

export default NavigationSearch;


const { width } = Dimensions.get("window");

const styles = StyleSheet.create({

    searchContainer: {

        width: '80%',
        marginBottom: 10,
        zIndex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    icon: {
        marginRight: 1,
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: 16,
        paddingVertical: 0,
    },

});