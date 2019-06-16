import React, { Component } from "react";
import { Text, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import { colors } from "../config/colors";

const { width } = Dimensions.get("screen");

class CellBox extends Component {
  render() {
    const { active, disabled, onPress, cellData, wrong } = this.props;
    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        style={[
          styles.cellStyle,
          {
            backgroundColor: active
              ? colors.success
              : wrong
              ? colors.danger
              : colors.primary
          }
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={styles.cellText}>{active || wrong ? cellData : ""}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  cellStyle: {
    width: width / 2 / 1.3,
    height: width / 2 / 1.3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    elevation: 5
  },
  cellText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFF"
  }
});

export default CellBox;
