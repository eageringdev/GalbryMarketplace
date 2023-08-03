import React, { useEffect } from "react";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { setCurrentUserInfoAction } from "@/store/actions/UserActions";

// import components
import ImageSkeleton from "@/components/ImageSkeleton";
import CustomImage from "@/components/CustomImage";

// import utils
import customFetch from "@/utils/customFetch";

// import constants
import { constants } from "@/constants";

const UserAvatar = ({
  onClick,
  currentUser,
  currentWallet,
  setCurrentUserInfoAction,
  className,
}) => {
  useEffect(() => {
    if (currentWallet?.address) {
      customFetch({ method: "get", path: "users/" + currentWallet.address })
        .then((res) => {
          const user = res.data;
          if (!user || Object.keys(user).length === 0) {
            setCurrentUserInfoAction(constants.defaultUserInfo);
          } else {
            setCurrentUserInfoAction(user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentWallet]);

  const avatarPath = currentUser?.avatar
    ? currentUser?.avatar === "default"
      ? window.origin + "/profile/default_avatar.png"
      : currentUser?.avatar
    : window.origin + "/profile/default_avatar.png";

  return (
    <>
      {currentWallet ? (
        currentUser ? (
          <CustomImage
            onClick={onClick}
            className={"header_avatar " + className || ""}
            alt="avatar"
            src={avatarPath}
            key={avatarPath}
          />
        ) : (
          <div className={"header_avatar " + className || ""} onClick={onClick}>
            <ImageSkeleton style={{ borderRadius: "50%" }} />
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUserInfoAction: (data) => setCurrentUserInfoAction(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
