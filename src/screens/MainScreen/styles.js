import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  tryAgainBtn: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 9999
  },
  headerContainer: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  levelTitle: {
    fontSize: 16,
    color: colors.textColor,
    fontWeight: "800"
  },
  levelText: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.underlay
  },
  scoreText: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.success
  },
  cellBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

export default styles;
