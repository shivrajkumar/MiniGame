import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
let timer = () => {};
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.counter,
      initialTime: props.counter
    };
  }

  componentDidMount() {
    this.countdownTimer();
  }

  countdownTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!this.state.remainingTime) {
        clearInterval(timer);
        this.props.resetLevel();
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
        <Text>
          {minutes} : {seconds}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#CCC"
  }
});

export default Timer;
