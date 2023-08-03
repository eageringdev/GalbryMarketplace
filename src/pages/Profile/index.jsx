import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { setShowConnectWalletModalAction } from "@/store/actions/WalletActions";

// import icons
import { AiOutlineLeft } from "react-icons/ai";

const ProfilePage = ({ currentWallet, setShowConnectWalletModalAction }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!(currentWallet && currentWallet.address)) {
      setShowConnectWalletModalAction(true);
    }
  }, [currentWallet]);

  return (
    <>
      <div
        className="top_back_link"
        onClick={() => {
          navigate(-1);
        }}
      >
        <AiOutlineLeft className="me-1" />
        Back
      </div>
      <Outlet />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
});
const mapDispatchToProps = (dispatch) => ({
  setShowConnectWalletModalAction: (data) =>
    setShowConnectWalletModalAction(dispatch, data),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
