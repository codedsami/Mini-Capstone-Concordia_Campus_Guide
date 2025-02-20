import React, {useState, useEffect, useCallback, useRef} from "react";
import {
    View,
    StyleSheet,
    Platform,
    StatusBar,
    Button,
    FlatList,
    TouchableOpacity,
    TextInput,
    Text,
    Keyboard
} from 'react-native';
import CustomButton from "./elements/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import {getBuildings} from "../../api/dataService";
import {useFocusEffect} from "@react-navigation/native";

const CustomNavSearch = ({ navigation, route }) => {

    const {type, onGoBack} = route.params || {};

    const [allLocations, setAllLocations] = useState([]); //gets the buildings in both campus

    const fetchAllLocations = async () => {
        try {
            const data = await getBuildings();
            setAllLocations(data);
            setFilteredLocations(data);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchAllLocations();
        }, [])
    )


    const [searchText, setSearchText] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);

    const inputRef = useRef(null);

    const handleSearch = (text) => {
        setSearchText(text);

        if (text.length > 0) {
            const filtered = allLocations.filter(
                (loc) =>
                    loc.name.toLowerCase().includes(text.toLowerCase()) ||
                    loc.civic_address.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations([]);
        }
    };

    // Handle selecting a location
    const handleSelectLocation = (location) => {
        Keyboard.dismiss();
        setSearchText(location.name);

        if (onGoBack) {
            onGoBack(location);
        }

        navigation.goBack();
    };

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#800020" />
                </TouchableOpacity>

                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder={type==="destination" ? "Choose destination" : "Choose start"}
                    value={searchText}
                    returnKeyType="done"
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                keyboardShouldPersistTaps="handled"
                data={filteredLocations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handleSelectLocation(item)}>
                        <Text style={styles.buildingName}>{item.name}</Text>
                        <Text style={styles.address}>{item.civic_address}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#800020",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
    },
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    input: {
        flex: 1, // Take up remaining space
        fontSize: 18,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#800020",
    },
    buildingName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    address: {
        fontSize: 14,
        fontStyle: "italic",
        color: "gray",
    },
});


export default CustomNavSearch;