import React from "react";
import "./App.scss";

// import router
import MainRouter from "./routes";

// import components
import ConnectWalletModal from "./components/ConnectWalletModal";

const App = () => {
  return (
    <div className="App">
      <MainRouter />
      <ConnectWalletModal />
    </div>
  );
};

export default App;
