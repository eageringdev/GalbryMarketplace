import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.scss";

// import modal
import Modal from "react-modal";
Modal.setAppElement("#root");

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// import carousel css
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// import toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// import store
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer limit={3} />
    </Provider>
  </React.StrictMode>
);
