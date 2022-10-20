import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";

import { store } from "./src/store/store";

import { Navigator } from "./src/infrastructure/navigations/navigator";


function App() {

  useEffect(() => {
    SplashScreen.hide();
  },[]);

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
