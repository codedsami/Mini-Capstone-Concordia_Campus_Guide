import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Marker } from "react-native-maps";
import markerImage from "../assets/marker-1.png";

const CustomMarker = ({ value, onPress, destination }) => {
  return (
    <Marker
      coordinate={{
        latitude: value.location.latitude,
        longitude: value.location.longitude,
      }}
      onPress={() => {
        onPress();
      }}
    >
      <View testID="marker-container" style={styles.markerContainer}>
        <Image
          source={{ uri: markerImage }} // Your marker image
          style={!destination ? styles.markerImage : styles.destinationMarker}
        />
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value.building_code}</Text>
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  destinationMarker: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  markerImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  valueContainer: {
    position: "absolute",
    top: 5,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  valueText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default CustomMarker;
