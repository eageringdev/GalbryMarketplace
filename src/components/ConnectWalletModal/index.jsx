import React from "react";

// import redux
import { connect } from "react-redux";
import { setShowConnectWalletModalAction } from "@/store/actions/WalletActions";

// import components
import Modal from "react-modal";
import ConnectWallet from "../../pages/ConnectWallet";

const connectWalletModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "70%",
    minWidth: "300px",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "#111111AA",
    zIndex: 4,
    overflow: "auto",
  },
};

const ConnectWalletModal = ({
  showConnectWalletModal,
  setShowConnectWalletModalAction,
}) => {
  return (
    <Modal
      isOpen={showConnectWalletModal}
      onAfterOpen={() => {
        document.body.style.overflow = "hidden";
      }}
      onAfterClose={() => {
        document.body.style.overflow = "auto";
      }}
      onRequestClose={() => {
        setShowConnectWalletModalAction(false);
      }}
      style={connectWalletModalStyle}
    >
      <ConnectWallet showBackButton={false} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  showConnectWalletModal: state.wallets.showConnectWalletModal,
});
const mapDispatchToProps = (dispatch) => ({
  setShowConnectWalletModalAction: (data) =>
    setShowConnectWalletModalAction(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWalletModal);
