import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import redux
import { connect } from "react-redux";

// import actions
import { setCurrentWalletInfoAction } from "../../store/actions/WalletActions";
import { setCurrentUserInfoAction } from "../../store/actions/UserActions";

const Logout = ({ setCurrentWalletInfoAction, setCurrentUserInfoAction }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUserInfoAction(null);
    setCurrentWalletInfoAction(null);
    navigate("/explore");
  }, []);

  return <div>Wait...</div>;
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentWalletInfoAction: (data) =>
    setCurrentWalletInfoAction(dispatch, data),
  setCurrentUserInfoAction: (data) => setCurrentUserInfoAction(dispatch, data),
});
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
