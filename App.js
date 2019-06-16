import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MainApp from "./src/screens/MainScreen";
import configureStore from "./src/redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={configureStore().store}>
        <PersistGate loading={null} persistor={configureStore().persistor}>
          <MainApp />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
