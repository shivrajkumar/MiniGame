import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { shuffle } from "lodash";
import Timer from "./src/components/Timer";

const { width } = Dimensions.get("screen");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selectedIndex: [],
      levelData: [],
      level: 1
    };
  }

  pushSelected(data, index) {
    let { selected, selectedIndex, level } = this.state;
    if (!selected.length) {
      selected.push(data);
      selectedIndex.push(index);
    } else if (selected.includes(data)) {
      selected = [];
      selectedIndex.push(index);
    } else {
      selected = [];
      selectedIndex.pop();
    }
    this.setState({ selected, selectedIndex });
    if (selectedIndex.length === (level + 1) * 2) {
      this.setState(
        {
          level: level + 1,
          selected: [],
          selectedIndex: [],
          levelData: []
        },
        () => this.getLevelData(level + 1)
      );
    }
  }

  getLevelData(level) {
    const { levelData } = this.state;
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
    this.setState({ selectedIndex: [], selected: [] });
  }

  render() {
    const { levelData, level, selected, selectedIndex } = this.state;
    console.log(selected, "selected", selectedIndex);
    return (
      <View style={styles.container}>
        <View
          style={{
            padding: 30,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
          >
            Level:{" "}
            <Text style={{ fontWeight: "700", fontSize: 20 }}>{level}</Text>
          </Text>
          <Text style={{ fontSize: 16 }}>
            Scror:{" "}
            <Text style={{ fontWeight: "700", fontSize: 20 }}>{level + 2}</Text>
          </Text>
        </View>
        <Timer counter={60 * level} resetLevel={() => this.resetLevel()} />
        <View
          style={{
            flex: 1
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            {levelData.map((data, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  underlayColor={"#626fb2"}
                  style={{
                    width: width / 2 / 1.3,
                    height: width / 2 / 1.3,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedIndex.includes(index)
                      ? "#019688"
                      : "#3F51B5",
                    margin: 10,
                    borderRadius: 10,
                    elevation: 5
                  }}
                  disabled={selectedIndex.includes(index)}
                  onPress={() => this.pushSelected(data, index)}
                >
                  <Text>{selectedIndex.includes(index) ? data : ""}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  }
});

//make this component available to the app
export default App;
