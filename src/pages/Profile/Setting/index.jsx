import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { updateUserInfo } from "@/store/actions/UserActions";

// import components
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import ImageSkeleton from "@/components/ImageSkeleton";
import CustomImage from "../../../components/CustomImage";
import { toast } from "react-toastify";

// import icons
import { FiCopy } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

// import utils
import copy from "copy-to-clipboard";
import toBase64 from "@/utils/common/toBase64";

// import constants
import { constants } from "../../../constants";

let avatarFile = null;

const ProfileSetting = ({ currentUser, currentWallet, updateUserInfo }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [walletInputValue, setWalletInputValue] = useState(
    currentWallet?.address || ""
  );
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarPreviewLoading, setAvatarPreviewLoading] = useState(false);

  useEffect(() => {
    setWalletInputValue(currentWallet?.address || "");
    setUserName(currentUser?.userName ? currentUser?.userName : "");
    setBio(currentUser?.bio || "");
    setAvatarPreview("");
  }, [currentWallet, currentUser]);

  const onAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      avatarFile = file;
      setAvatarPreviewLoading(true);
      toBase64(file)
        .then((res) => {
          setAvatarPreview(res);
          setAvatarPreviewLoading(false);
        })
        .catch((err) => {
          setAvatarPreview("");
          setAvatarPreviewLoading(false);
        });
    }
  };

  const resetAvatar = () => {
    setAvatarPreview(constants.defaultAvatarPath);
    avatarFile = "default";
  };

  const onSave = () => {
    setLoading(true);
    updateUserInfo({
      avatar: avatarPreview ? avatarFile : "same",
      userName: userName || "",
      bio: bio || "",
      walletData: currentWallet,
    })
      .then((res) => {
        setLoading(false);
        toast.success("Successfully saved.");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Occured while saving.");
      });
  };

  const avatarPath = currentUser?.avatar
    ? currentUser?.avatar === "default"
      ? constants.defaultAvatarPath
      : currentUser?.avatar
    : constants.defaultAvatarPath;

  return (
    <div className="w-100 h-100 mt-4 profile_section">
      {currentWallet?.address ? (
        <>
          {/* start top panel */}
          <div className="text-center">
            <h4 className="text-white">Profile Setting</h4>
            <div className="d-flex justify-content-center">
              <div className="mt-3 d-flex align-items-center justify-content-center">
                <label
                  htmlFor="avatar_file_input"
                  className="overlay_container"
                >
                  {avatarPreviewLoading ? (
                    <ImageSkeleton
                      className="rounded-circle overlay_content profile_avatar"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <CustomImage
                      className="rounded-circle overlay_content profile_avatar"
                      alt="avatar"
                      src={avatarPreview ? avatarPreview : avatarPath}
                    />
                  )}
                  <div className="overlay">
                    <AiOutlineEdit color="white" size={32} />
                  </div>
                </label>

                <input
                  id="avatar_file_input"
                  className="d-none"
                  type="file"
                  accept="image/*"
                  onChange={onAvatarChange}
                />
              </div>

              <div className="h-100 align-items-start pt-2">
                <BiReset
                  className="avatar_reset_button"
                  size={32}
                  onClick={() => {
                    resetAvatar();
                  }}
                />
              </div>
            </div>
            <div className="mt-2 text-white">
              Recommended format
              <br />
              750px &times; 750px in .png, .jpg, .webp
            </div>
          </div>
          {/* end top panel */}
          {/* start control panel */}
          <div className="mt-3 profile_setting_controls_container">
            {/* Start User Name */}
            <div className="control_field">
              <div className="label">User Name</div>
              <input
                className="secondary_input w-100"
                name="user_name"
                placeholder="Enter User Name"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            {/* End User Name */}

            {/* Start Bio */}
            <div className="control_field">
              <div className="label">Bio</div>
              <textarea
                className="secondary_input w-100"
                name="bio"
                placeholder="Tell the world your story!"
                rows={4}
                value={bio}
                onChange={(event) => {
                  setBio(event.target.value);
                }}
              ></textarea>
            </div>
            {/* End Bio */}

            {/* Start Wallet Address */}
            <div className="control_field">
              <div className="label">Wallet Address</div>
              <div className="d-flex flex-row">
                <input
                  className="secondary_input w-100"
                  name="wallet_address"
                  placeholder="Enter Wallet Address"
                  style={{
                    borderRadius: "8px 0px 0px 8px",
                    color: "#CCCCCC",
                    transition: "0.5s",
                  }}
                  disabled
                  value={walletInputValue}
                />
                <div
                  style={{
                    borderRadius: "0px 8px 8px 0px",
                    backgroundColor: "#181818",
                  }}
                  className="text-white d-flex align-items-center justify-content-center p-3"
                >
                  <FiCopy
                    className="copy_icon"
                    color="#B3B4BD"
                    size={24}
                    onClick={() => {
                      copy(currentWallet?.address || "");
                      setWalletInputValue("Copied");
                      setTimeout(() => {
                        setWalletInputValue(currentWallet?.address);
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* End Wallet Address */}
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="col-12 text-center text-sm-start col-sm-6">
                <SecondaryButton
                  className="col-10 col-md-8"
                  text="Back"
                  onClick={() => {
                    navigate(-1);
                  }}
                  disabled={loading}
                />
              </div>

              <div className="col-12 mt-2 mt-sm-0 text-center text-sm-end col-sm-6">
                <PrimaryButton
                  className="col-10 col-md-8"
                  text="Save"
                  onClick={() => {
                    onSave();
                  }}
                  loading={loading}
                />
              </div>
            </div>
          </div>
          {/* end control panel */}
        </>
      ) : (
        <h3 className="pt-5 pb-5 text-center text-white">
          Please connect your wallet.
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (data) => updateUserInfo(dispatch, data),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);
