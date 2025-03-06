import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";  // ✅ Remove `{ store }`, just use `store`
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
