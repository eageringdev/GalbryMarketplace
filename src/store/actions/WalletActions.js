import {
  SET_CURRENT_WALLET_INFO,
  SET_CURRENT_USER_INFO,
  SET_SHOW_CONNECT_WALLET_MODAL,
} from "../types";

// import actions
import customFetch from "@/utils/customFetch";

// import constants
import { constants } from "../../constants";

export const setCurrentWalletInfoAction = (dispatch, data) => {
  if (data?.address) {
    customFetch({ method: "get", path: "users/" + data.address })
      .then((res) => {
        const user = res.data;
        if (!user) {
          dispatch({
            type: SET_CURRENT_USER_INFO,
            payload: constants.defaultUserInfo,
          });
        } else {
          dispatch({
            type: SET_CURRENT_USER_INFO,
            payload: user,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dispatch({
    type: SET_CURRENT_WALLET_INFO,
    payload: data,
  });
};

export const setShowConnectWalletModalAction = (dispatch, data) => {
  dispatch({
    type: SET_SHOW_CONNECT_WALLET_MODAL,
    payload: data,
  });
};
