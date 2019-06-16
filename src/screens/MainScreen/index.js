import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { shuffle } from "lodash";

import { changeLevel, updateScore, resetGame } from "../../redux/actions/game";
import Timer from "../../components/Timer";
import CellBox from "../../components/CellBox";
import Button from "../../components/Button";
import styles from "./styles";

const { width } = Dimensions.get("screen");

class MainApp extends Component {
  timerRef = React.createRef();
  scrollRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selectedIndex: [],
      wronglySelectedIndex: [],
      levelData: [],
      level: props.level,
      tryAgain: false,
      levelTime: 30
    };
  }

  pushSelected(data, index) {
    let { selected, selectedIndex, level, wronglySelectedIndex } = this.state;
    const { updateScore, resetGame } = this.props;
    if (!selected.length) {
      selected.push(data);
      selectedIndex.push(index);
      this.setState({ selected, selectedIndex });
    } else if (selected.includes(data)) {
      selected = [];
      selectedIndex.push(index);
      this.setState({ selected, selectedIndex });
    } else {
      wronglySelectedIndex.push(index);
      this.setState({ wronglySelectedIndex });
      setTimeout(() => {
        selected = [];
        selectedIndex.pop();
        wronglySelectedIndex.pop();
        this.setState({ selected, selectedIndex, wronglySelectedIndex });
      }, 500);
    }
    if (selectedIndex.length === (level + 1) * 2) {
      if (level < 6) {
        this.timerRef.current.stopTimer();
        Alert.alert(
          `Congratulations`,
          `Level ${level} Completed`,
          [
            {
              text: "Next Level",
              onPress: () => {
                this.setState(
                  {
                    level: level + 1,
                    selected: [],
                    selectedIndex: [],
                    levelData: []
                  },
                  () => {
                    this.scrollRef.current.scrollTo({
                      x: 0,
                      y: 0,
                      animated: false
                    });
                    updateScore(level * 2);
                    this.getLevelData(level + 1);
                    this.timerRef.current.startTimer();
                  }
                );
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          `Congratulations`,
          `You have completed all the levels`,
          [
            {
              text: "Start Again",
              onPress: () => {
                this.setState(
                  {
                    level: 1,
                    selected: [],
                    selectedIndex: [],
                    levelData: []
                  },
                  () => {
                    resetGame();
                    this.getLevelData(1);
                  }
                );
              }
            }
          ],
          { cancelable: false }
        );
      }
    }
  }

  getLevelData(level) {
    const { levelData } = this.state;
    const { changeLevel } = this.props;
    changeLevel(level);
    let i;
    for (i = level; i >= 0; i--) {
      levelData.push(i);
      levelData.push(i);
    }
    const { selected } = this.state;
    const suffledData = shuffle(levelData);
    this.setState({ levelData: suffledData });
  }

  componentDidMount() {
    const { level } = this.state;
    this.getLevelData(level);
  }

  resetLevel() {
    this.setState({ selectedIndex: [], selected: [], tryAgain: true });
  }

  tryAgainLevel() {
    const { levelTime, tryAgains } = this.state;
    this.resetLevel();
    this.setState({ tryAgain: false });
    this.timerRef.current.startTimer();
  }

  render() {
    const {
      levelData,
      level,
      selected,
      selectedIndex,
      tryAgain,
      levelTime,
      wronglySelectedIndex
    } = this.state;
    const { score } = this.props;
    return (
      <View style={styles.container}>
        {tryAgain && (
          <View style={styles.tryAgainBtn}>
            <Button text="TRY AGAIN" onPress={() => this.tryAgainLevel()} />
          </View>
        )}
        <View style={styles.headerContainer}>
          <Text style={styles.levelTitle}>
            Level: <Text style={styles.levelText}>{level}</Text>
          </Text>
          <Text style={styles.levelTitle}>
            Score: <Text style={styles.scoreText}>{score}</Text>
          </Text>
        </View>
        <Timer
          ref={this.timerRef}
          counter={levelTime * level}
          resetLevel={() => this.resetLevel()}
        />

        <View
          style={{
            flex: 1
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            ref={this.scrollRef}
            contentContainerStyle={styles.cellBoxContainer}
          >
            {levelData.map((data, index) => {
              let disabled =
                selectedIndex.includes(index) ||
                tryAgain ||
                wronglySelectedIndex.length
                  ? true
                  : false;
              return (
                <CellBox
                  key={index}
                  cellData={data}
                  active={selectedIndex.includes(index)}
                  wrong={wronglySelectedIndex.includes(index)}
                  disabled={disabled}
                  onPress={() => this.pushSelected(data, index)}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProp(state) {
  return {
    level: state.gameLevel,
    score: state.score
  };
}
function bindToAction(dispatch) {
  return {
    changeLevel: level => dispatch(changeLevel(level)),
    updateScore: score => dispatch(updateScore(score)),
    resetGame: () => dispatch(resetGame())
  };
}
export default connect(
  mapStateToProp,
  bindToAction
)(MainApp);
