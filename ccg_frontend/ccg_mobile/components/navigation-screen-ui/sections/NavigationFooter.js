import React from "react";
import { Text, TouchableOpacity, Animated, SafeAreaView, StyleSheet, View } from "react-native";
import DurationAndDistanceInfo from "../elements/DurationAndDistanceInfo";
import PropTypes from "prop-types";

const NavigationFooter = ({ onStartNavigation, totalDuration, totalDistance, onShowDirections }) => {
  const [fadeIn] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeIn }]}>
        <DurationAndDistanceInfo duration={totalDuration} distance={totalDistance} />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.startButton} onPress={onStartNavigation}>
            <Text style={styles.startButtonText}>Start Navigation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={onShowDirections}>
            <Text style={styles.startButtonText}>Preview</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

NavigationFooter.propTypes = {
  totalDuration: PropTypes.number,
  totalDistance: PropTypes.number,
  onStartNavigation: PropTypes.func.isRequired,
};

export default NavigationFooter;

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "flex-end",
    height: "12%",
    width: "100%",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#800020",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonWrapper: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10, // Adds space between buttons
  },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    width: 160,
    marginVertical: 5,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#800020",
  },
});
