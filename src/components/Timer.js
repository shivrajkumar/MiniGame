import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../config/colors";
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.counter,
      initialTime: props.counter
    };
    timer = () => {};
  }

  componentDidMount() {
    this.countdownTimer();
  }

  startTimer() {
    this.countdownTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  countdownTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.state.remainingTime) {
        clearInterval(this.timer);
        this.props.resetLevel();
        this.setState({ initialTime: 0 });
        return false;
      }
      this.setState(prevState => {
        return { remainingTime: prevState.remainingTime - 1 };
      });
    }, 1000);
  }

  updateTime(counter) {
    this.setState({
      initialTime: counter,
      remainingTime: counter
    });
  }

  componentWillReceiveProps(nextState, prevState) {
    if (this.state.initialTime !== nextState.counter) {
      this.updateTime(nextState.counter);
    }
  }

  render() {
    var minutes = Math.floor(this.state.remainingTime / 60);
    var seconds = this.state.remainingTime - minutes * 60;
    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 4,
    borderColor: colors.textColor,
    borderRadius: 10,
    width: 120,
    marginBottom: 20
  },
  time: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.textColor
  }
});

export default Timer;
