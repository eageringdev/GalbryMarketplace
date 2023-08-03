import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

// import redux
import { connect } from "react-redux";

// import components
import PrimaryComboBox from "@/components/PrimaryComboBox";
import CustomImage from "../../../components/CustomImage";
import Asset from "../../../components/Asset";
import ImageSkeleton from "../../../components/ImageSkeleton";

// import icons
import { AiFillSetting, AiOutlineEdit } from "react-icons/ai";

// import utils
import shortenAddress from "@/utils/common/shortenAddress";
import { getCreatedAssets, getMyAssets } from "../../../utils/wallets/nft";

const orderOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price High", value: "price_high" },
  { label: "Price Low", value: "price_low" },
];

const categoryOptions = [
  // { label: "All Assets", value: "all_assets" },
  { label: "Created Assets", value: "created_assets" },
  { label: "My Assets", value: "my_assets" },
];

const ProfileOverview = ({ currentWallet, currentUser }) => {
  const navigate = useNavigate();

  // search
  const [order, setOrder] = useState(orderOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);

  const [createdAssets, setCreatedAssets] = useState(null);
  const [myAssets, setMyAssets] = useState(null);

  useEffect(() => {
    setCreatedAssets(null);
    setMyAssets(null);
    if (currentWallet?.address) {
      getCreatedAssets({ walletAddress: currentWallet?.address }).then(
        (res) => {
          setCreatedAssets(res);
        }
      );
      getMyAssets({ walletAddress: currentWallet?.address }).then((res) => {
        setMyAssets(res);
      });
    }
  }, [currentWallet]);

  const avatarPath = currentUser?.avatar
    ? currentUser?.avatar === "default"
      ? window.origin + "/profile/default_avatar.png"
      : currentUser?.avatar
    : window.origin + "/profile/default_avatar.png";

  return (
    <div className="w-100 h-100 mt-4 profile_section">
      {currentWallet?.address ? (
        <>
          {/* start top panel */}
          <div className="text-center">
            <div className="w-100 d-flex align-items-center justify-content-center">
              <div
                className="overlay_container"
                onClick={() => {
                  navigate("setting");
                }}
              >
                {currentUser?.avatar ? (
                  <CustomImage
                    className="rounded-circle overlay_content profile_avatar"
                    alt="avatar"
                    src={avatarPath}
                  />
                ) : (
                  <ImageSkeleton className="rounded-circle overlay_content profile_avatar" />
                )}

                <div className="overlay">
                  <AiOutlineEdit color="white" size={32} />
                </div>
              </div>
            </div>

            <h3 className="mt-3 text-white">
              {currentUser?.userName || "Unnamed"}
            </h3>
            <div className="mt-2 d-flex align-items-center justify-content-center flex-wrap">
              <div className="address_section mt-2">
                <img
                  alt="ether"
                  src={window.origin + "/ether_secondary.png"}
                  width={32}
                  height={32}
                />
                <div className="text-white ms-2">
                  {shortenAddress(currentWallet?.address, 6, 6)}
                </div>
              </div>
              <div
                className="profile_setting_button ms-2 mt-2"
                onClick={() => {
                  navigate("setting");
                }}
              >
                <AiFillSetting color="white" size={24} />
              </div>
            </div>
          </div>
          {/* end top panel */}

          {/* start tab list */}
          <div className="mt-5">
            <div className="tab_list">
              <div
                className={
                  "tab " +
                  (category?.value === "created_assets" ||
                  category?.value === "all_assets"
                    ? "active"
                    : "")
                }
                onClick={() => {
                  if (category?.value !== "created_assets")
                    setCategory(categoryOptions[0]);
                }}
              >
                Created Assets
              </div>
              <div
                className={
                  "tab " +
                  (category?.value === "my_assets" ||
                  category?.value === "all_assets"
                    ? "active"
                    : "")
                }
                onClick={() => {
                  if (category?.value !== "my_assets")
                    setCategory(categoryOptions[1]);
                }}
              >
                My Assets
              </div>
            </div>
          </div>
          {/* end tab list */}

          {/* start search combo */}
          <div className="mt-2 d-flex justify-content-end flex-wrap">
            <PrimaryComboBox
              currentValue={order}
              name="Orders"
              placeholder={"Select Order"}
              options={orderOptions}
              onChangeValue={(value) => {
                setOrder(value);
              }}
              style={{ minWidth: 132 }}
              className="mt-2"
              containerClassName="profile_primary_combo_box_container"
            />
            <PrimaryComboBox
              currentValue={category}
              name="Category"
              placeholder={"Select Cagetory"}
              options={categoryOptions}
              onChangeValue={(value) => {
                setCategory(value);
              }}
              style={{ minWidth: 170 }}
              className="ms-2 mt-2"
              containerClassName="profile_primary_combo_box_container"
            />
          </div>
          {/* end search combo */}

          <div className="mt-4 d-flex flex-row align-items-center justify-content-center flex-wrap">
            {category.value === "created_assets" && (
              <>
                {createdAssets ? (
                  createdAssets.length === 0 ? (
                    <div>
                      <h3 className="text-center text-white">
                        There are no assets.
                      </h3>
                    </div>
                  ) : (
                    createdAssets.map((tokenId) => (
                      <Asset
                        tokenId={tokenId}
                        key={"created_asset_" + tokenId.toNumber()}
                      />
                    ))
                  )
                ) : (
                  <div className="h-100 text-center d-flex flex-row align-items-center justify-content-center">
                    <div
                      className="spinner-border mt-2 mb-2"
                      style={{
                        color: "#b9b6b6",
                      }}
                      role="status"
                    ></div>
                  </div>
                )}
              </>
            )}
            {category.value === "my_assets" && (
              <>
                {myAssets ? (
                  myAssets.length === 0 ? (
                    <div>
                      <h3 className="text-center text-white">
                        There are no assets.
                      </h3>
                    </div>
                  ) : (
                    myAssets.map((tokenId) => (
                      <Asset
                        tokenId={tokenId}
                        key={"created_asset_" + tokenId.toNumber()}
                      />
                    ))
                  )
                ) : (
                  <div className="h-100 text-center d-flex flex-row align-items-center justify-content-center">
                    <div
                      className="spinner-border mt-2 mb-2"
                      style={{
                        color: "#b9b6b6",
                      }}
                      role="status"
                    ></div>
                  </div>
                )}
              </>
            )}
          </div>
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
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileOverview);
