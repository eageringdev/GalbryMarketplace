import React, { useState, useEffect } from "react";
import "./index.scss";

// import components
import CustomImage from "../../components/CustomImage";

// import constants
import { constants } from "../../constants";

// import utils
import customFetch from "../../utils/customFetch";
import shortenAddress from "../../utils/common/shortenAddress";

const UserInfo = ({ walletAddress, label, className = "", style = {} }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    customFetch({ method: "get", path: "users/" + walletAddress })
      .then((res) => {
        const user = res.data;
        if (!user) {
          setUser(constants.defaultUserInfo);
        } else {
          setUser(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const avatarPath = user?.avatar
    ? user?.avatar === "default"
      ? constants.defaultAvatarPath
      : user?.avatar
    : constants.defaultAvatarPath;

  return (
    <>
      {!user ? (
        <div className="spinner-border user_info_loading" role="status"></div>
      ) : (
        <div className={"d-flex align-items-center " + className}>
          <CustomImage
            alt="avatar"
            src={avatarPath}
            className="user_info_avatar"
          />
          <div className="ms-2">
            <div style={{ color: "#808080", fontSize: 14 }}>{label}</div>
            <div className="text-white">
              {user?.userName || shortenAddress(walletAddress, 5, 3)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
