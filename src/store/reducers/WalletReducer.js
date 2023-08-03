import {
  SET_CURRENT_WALLET_INFO,
  SET_SHOW_CONNECT_WALLET_MODAL,
} from "../types";

const initialState = {
  currentWallet: null,
  showConnectWalletModal: false,
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_WALLET_INFO: {
      return {
        ...state,
        currentWallet: action.payload,
      };
    }
    case SET_SHOW_CONNECT_WALLET_MODAL: {
      return {
        ...state,
        showConnectWalletModal: action.payload,
      };
    }
    default:
      return state;
  }
};

export default WalletReducer;
