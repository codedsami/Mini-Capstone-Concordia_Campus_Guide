import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import locationService from "../../../services/LocationService";
import CustomMarker from "../elements/CustomMarker.js";
import InfoPopup from "../elements/InfoPopUp.js";
import transformCurrentLoc from "../../../utils/transformCurrentLoc";
import BuildingHighlight from "../elements/BuildingHighlight";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

const MapViewComponentImpl = ({
  pointsOfInterest = [],
  target = {},
  locations = [],
  region,
  maxBounds,
  selectedPointOfInterest,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [targetRegion, setTargetRegion] = useState(region);

  const handleRegionChange = region => {
    if (Platform.OS == "android") {
      const zoomThreshold = 0.006;
      setShowMarkers(region.latitudeDelta < zoomThreshold);
    }
  };

  const handleMarkerPress = location => {
    setTimeout(() => {
      setShowPopup(true);
      setSelectedMarker(prev => (prev === location ? null : location));
    }, 0);
  };

  const onGoToLocation = location => {
    navigation.navigate("Navigation", {
      start: null,
      destination: location,
      allLocations: [
        ...locations.map(item => ({ ...item, id: `school-${item.id}` })),
        ...pointsOfInterest.map(item => ({ ...item, id: `poi-${item.id}` })),
      ],
    });
  };

  useEffect(() => {
    if (locations.length > 0) {
      setIsLoading(false);
    }
  }, [locations]);

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        await locationService.startTrackingLocation();
        const location = locationService.getCurrentLocation();
        if (location && isMounted) {
          setCurrentLocation(transformCurrentLoc(location));
        }
      } catch (error) {
        if (isMounted) {
          console.log("Error fetching location:", error);
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false;
      locationService.stopTrackingLocation();
    };
  }, []);

  useEffect(() => {
    if (target?.id) {
      setMapKey(prevKey => prevKey + 1);
      setTargetRegion({
        latitude: target.location.latitude + 0.0009,
        longitude: target.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSelectedMarker(target);
      setShowPopup(true);
    } else {
      setShowPopup(false);
      setMapKey(prevKey => prevKey + 1);
      setTargetRegion(region);
    }
  }, [target]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={styles.loadingText}>Loading locations...</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            key={mapKey}
            testID="map-view"
            style={styles.map}
            region={targetRegion}
            maxBounds={maxBounds}
            showsUserLocation={true}
            onRegionChangeComplete={handleRegionChange}
            zoomControlEnabled={false}
            showsMyLocationButton={false}
            toolbarEnabled={false}
            onPress={() => setSelectedMarker(null)}
            {...(Platform.OS == "android" && {
              maxZoomLevel: 19,
              minZoomLevel: 16,
            })}
            {...(Platform.OS == "ios" && {
              cameraZoomRange: {
                minCenterCoordinateDistance: 500,
                maxCenterCoordinateDistance: 3000,
                animated: true,
              },
            })}
          >
            {target.id ? (
              <CustomMarker key={target.id} value={target} onPress={() => handleMarkerPress(target)} />
            ) : (
              showMarkers !== (Platform.OS == "ios") &&
              locations.map(location => (
                <CustomMarker key={location.id} value={location} onPress={() => handleMarkerPress(location)} />
              ))
            )}

            {currentLocation?.coords && (
              <Marker
                coordinate={{
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                }}
                title="Current Location"
                pinColor="blue"
                testID="current-location-marker"
              />
            )}


            {selectedPointOfInterest?.map(point => (
              <CustomMarker key={point.id} value={point} onPress={() => handleMarkerPress(point)} />
            ))}

            <BuildingHighlight />

          </MapView>
        </View>
      )}

      {showPopup && selectedMarker !== null && (
        <View style={styles.popupWrapper}>
          <InfoPopup value={selectedMarker} onClose={() => setSelectedMarker(null)} onGo={onGoToLocation} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  popupWrapper: {
    position: "absolute",
    bottom: 300,
    left: 20,
    right: 20,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
});

MapViewComponentImpl.propTypes = {
  pointsOfInterest: PropTypes.array,
  target: PropTypes.object,
  locations: PropTypes.array.isRequired,
  region: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }).isRequired,
  maxBounds: PropTypes.shape({
    northeast: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    southwest: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

// Create a memoized version of the component to prevent unnecessary re-renders
const MapViewComponent = React.memo(MapViewComponentImpl);

// Use the same propTypes for the wrapped component
MapViewComponent.propTypes = MapViewComponentImpl.propTypes;

export default MapViewComponent;
