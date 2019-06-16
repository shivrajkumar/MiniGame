import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../config/colors";

class Button extends Component {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  btnText: {
    fontWeight: "800",
    fontSize: 20,
    color: "#FFF",
    letterSpacing: 0.8
  }
});

export default Button;
