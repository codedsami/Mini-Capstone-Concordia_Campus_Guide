import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "react-native-vector-icons"; // Import Ionicons
import Hall8 from "../floors/Hall-8.png";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";

const IndoorMap = ({ path, index }) => {

  const pinSize = 90;

  return (
    <View style={styles.container}>
      <Text>ReactNativeZoomableView</Text>
      <View style={{ borderWidth: 5, height: 350, width: "100%" }}>
        <ReactNativeZoomableView
          maxZoom={10}
          minZoom={0.3}
          zoomStep={0.5}
          bindToBorders={true}
          contentWidth={1024}
          contentHeight={1024}
          initialZoom={0.3}
        >
          <ImageBackground style={{ width: 1024, height: 1024, resizeMode: "contain" }} source={Hall8}>
            <Svg style={styles.svg} testID="path-svg">
              {path !== "" && <Path d={path["path_data"][path["floor_sequence"][index]]} fill="transparent" stroke="black" strokeWidth="5" />}
            </Svg>

            {/* Start Pin */}
            {/* The pin needs to be centered at the specified coordinates. 
            If we place the icon at exactly startPin[0] and startPin[1], 
            the top-left corner of the pin will be at that point */}
            {path !== "" && path["pin"][path["floor_sequence"][index]] != null && (
              <Ionicons
                testID="start-pin"
                name="location-sharp"
                size={pinSize}
                color="black"
                style={[
                  styles.pin,
                  {
                    left: path["pin"][path["floor_sequence"][index]][0][0] - pinSize / 2, // x-coord
                    top: path["pin"][path["floor_sequence"][index]][0][1] - pinSize, // y-coord
                  },
                ]}
              />
            )}
            {/* now, to center the pin at the coordinates, 
            we adjust the position by subtracting half the pin size from the x-coord & subtracting 
            the full pin size from the y-coord */}
            {/* Destination Pin */}
            {path !== "" && path["pin"][path["floor_sequence"][index]] != null && (
              <Ionicons
                testID="destination-pin"
                name="pin-outline"
                size={pinSize}
                color="black"
                style={[
                  styles.pin,
                  {
                    left: path["pin"][path["floor_sequence"][index]][1][0] - pinSize / 2,
                    top: path["pin"][path["floor_sequence"][index]][1][1] - pinSize,
                  },
                ]}
              />
            )}
          </ImageBackground>
        </ReactNativeZoomableView>
      </View>
    </View>
  );
};

IndoorMap.propTypes = {
  path: PropTypes.shape({
    pin: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    path_data: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "85%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  pin: {
    position: "absolute",
  },
});

export default IndoorMap;
