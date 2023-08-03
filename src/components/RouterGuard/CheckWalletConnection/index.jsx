import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const CheckWalletConnection = ({ children, currentWallet }) => {
  return (
    <>{currentWallet?.address ? children : <Navigate to="/connect-wallet" />}</>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckWalletConnection);
