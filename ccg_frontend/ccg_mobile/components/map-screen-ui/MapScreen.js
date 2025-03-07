import React, { useEffect, useState } from "react";
import { getBuildings, getPointOfInterests } from "../../api/dataService";

import MapViewComponent from "./sections/MapViewComponent";
import NavigationToggle from "./sections/NavigationToggle";
import { initialRegionSGW, initialRegionLoyola, maxBoundsSGW, maxBoundsLoyola } from "../../constants/initialRegions";

import { View, StyleSheet } from "react-native";

import HeaderBar from "./sections/HeaderBar";

const MapScreen = () => {
  const [allLocations, setAllLocations] = useState([]); //gets the buildings in both campus
  const [pointsOfInterest, setPointsOfInterest] = useState([]); //gets the buildings in both campus
  const [selectedCampus, setSelectedCampus] = useState("SGW");
  const [isIndoor, setIsIndoor] = useState(false);

  const [targetLocation, setTargetLocation] = useState({});

  const getRegion = () => {
    return selectedCampus === "SGW" ? initialRegionSGW : initialRegionLoyola;
  };

  const getMaxBounds = () => {
    return selectedCampus === "SGW" ? maxBoundsSGW : maxBoundsLoyola;
  };

  useEffect(() => {
    const setData = async () => {
      try {
        await fetchAllLocations();
        await fetchPointsOfInterests();
        console.log("Data fetched successfully.");
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    if (selectedCampus) {
      setData();
    }
  }, []);

  const onCampusSelect = campus => {
    setSelectedCampus(prevCampus => {
      if (prevCampus !== campus) {
        return campus;
      }
      return prevCampus;
    });
    setTargetLocation({});
  };

  const fetchAllLocations = async () => {
    try {
      const data = await getBuildings();
      setAllLocations(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPointsOfInterests = async () => {
    try {
      const data = await getPointOfInterests();
      setPointsOfInterest(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resetLocations = () => {
    fetchAllLocations();
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        setTargetLocation={setTargetLocation}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        onCampusSelect={onCampusSelect}
        setAllLocations={setAllLocations}
        locations={allLocations}
        pointsOfInterest={pointsOfInterest}
        resetLocations={resetLocations}
      />
      {/* Map */}
      <MapViewComponent
        locations={allLocations}
        pointsOfInterest={pointsOfInterest}
        target={targetLocation}
        region={getRegion()}
        maxBounds={getMaxBounds()}
      />

      <NavigationToggle isIndoor={isIndoor} setIsIndoor={setIsIndoor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  menuButton: { position: "absolute", top: 40, left: 20, zIndex: 1 },
  menuText: { fontSize: 30 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  campusSelector: {
    backgroundColor: "#8B1D3B",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  campusText: { color: "white", fontWeight: "bold" },
  map: { flex: 1 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  switchButton: { padding: 10, backgroundColor: "#eee", borderRadius: 10 },
});

export default MapScreen;
