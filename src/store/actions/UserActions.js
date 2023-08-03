import { SET_CURRENT_USER_INFO } from "../types";

// import utils
import { uploadImageToPinata } from "../../utils/common/upload";
import customFetch from "../../utils/customFetch";

export const updateUserInfo = (dispatch, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { avatar, userName, bio, walletData } = data;
      let uploadPath;
      if (avatar === "same" || avatar === "default") {
        uploadPath = avatar;
      } else {
        uploadPath = await uploadImageToPinata(avatar);
      }
      const res = await customFetch({
        method: "post",
        path: "users/",
        data: {
          avatar: uploadPath,
          userName,
          bio,
          walletData,
        },
      });
      dispatch({
        type: SET_CURRENT_USER_INFO,
        payload: res.data,
      });
      resolve(res.data);
    } catch (err) {
      console.log("updateUserInfo: ", err);
      reject(err);
    }
  });
};

export const setCurrentUserInfoAction = (dispatch, data) => {
  dispatch({
    type: SET_CURRENT_USER_INFO,
    payload: data,
  });
};
