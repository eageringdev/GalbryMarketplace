import React, { useState } from "react";
import "./index.scss";

// import redux
import { connect } from "react-redux";

// import actions
import {
  setCurrentWalletInfoAction,
  setShowConnectWalletModalAction,
} from "@/store/actions/WalletActions";

// import utils
import { metamaskConnect } from "../../utils/wallets/connect";
import { metamaskSign } from "../../utils/wallets/sign";

// import components
import IconComboBox from "./IconComboBox";
import { PrimaryButton } from "@/components/Buttons";

// import icons
import { AiOutlineLeft } from "react-icons/ai";

// import constants
import { constants } from "@/constants";

const ConnectWallet = ({
  setCurrentWalletInfoAction,
  setShowConnectWalletModalAction,
  showBackButton = true,
}) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const onConnectWallet = () => {
    if (!selectedWallet) {
      return;
    }
    if (selectedWallet.value === "metamask") {
      onMetamaskConnect();
    }
  };

  const onMetamaskConnect = () => {
    metamaskConnect({ setCurrentWalletInfoAction })
      .then(() => {
        metamaskSign({ message: "Welcome to Reitio!" })
          .then((res) => {
            setShowConnectWalletModalAction(false);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  return (
    <>
      {showBackButton && (
        <div
          className="top_back_link"
          onClick={() => {
            navigate(-1);
          }}
        >
          <AiOutlineLeft className="me-1" />
          Back
        </div>
      )}
      <div className="connect_wallet_logo_container mt-4">
        <img
          className="connect_wallet_logo"
          width={96}
          height={96}
          alt="logo"
          src={window.origin + "/favicon.png"}
        />
      </div>
      <div className="connect_wallet_container">
        <div className="connect_wallet_content">
          <div className="text-center text-white">
            <h4>Connect Wallet</h4>
            <p>Choose your wallet to sign in</p>
            <IconComboBox
              currentValue={selectedWallet}
              name="Select Wallet"
              options={constants.walletOptions}
              className="w-100"
              onChangeValue={(value) => {
                setSelectedWallet(value);
              }}
            />
          </div>
          <PrimaryButton
            disabled={!selectedWallet}
            className="mt-4 w-100"
            text="Connect"
            onClick={() => {
              onConnectWallet();
            }}
          />
        </div>
      </div>

      <div className="connect_wallet_bottom_container">
        <div className="w-100 d-flex justify-content-center">
          <div className="connect_wallet_divider w-80"></div>
        </div>
        <div className="text-white text-center mt-2">Terms and Conditions</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentWalletInfoAction: (data) =>
    setCurrentWalletInfoAction(dispatch, data),
  setShowConnectWalletModalAction: (data) =>
    setShowConnectWalletModalAction(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
