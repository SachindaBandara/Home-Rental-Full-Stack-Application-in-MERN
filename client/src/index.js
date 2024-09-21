import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";  // Import both as named exports
import { PersistGate } from "redux-persist/integration/react"; // Needed for redux-persist
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>  {/* PersistGate wraps your app */}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
