import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { addMetadataToCacheAction } from "@/store/actions/MetadataCacheActions";
import { setShowConnectWalletModalAction } from "@/store/actions/WalletActions";

// import components
import { toast } from "react-toastify";
import ImageSkeleton from "@/components/ImageSkeleton";
import CustomImage from "@/components/CustomImage";
import UserInfo from "../../components/UserInfo";
import { PrimaryButton, ThirdButton } from "../../components/Buttons";
import ModelViewer from "@/components/ModelViewer";

// import icons
import { AiOutlineLeft } from "react-icons/ai";
// import { FiEye, FiHeart } from "react-icons/fi";

// import constants
import { engine } from "../../constants";

// import utils
import {
  buyMarketItem,
  cancelMarketItem,
  getMarketItemById,
} from "../../utils/wallets/marketplace";
import { getMetadata } from "../../utils/wallets/nft";
import { addressCompare, isZeroAddress } from "../../utils/common/address";

const DetailPage = ({
  currentWallet,
  cachedMetadata,
  addMetadataToCacheAction,
  setShowConnectWalletModalAction,
}) => {
  const navigate = useNavigate();

  const { marketItemId } = useParams();
  const [marketItem, setMarketItem] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (parseInt(marketItemId) === Number(marketItemId)) {
      getMarketItemById(marketItemId)
        .then((res) => {
          setMarketItem(res);
          getMetadata({
            nftContractAddress: res.nftContractAddress,
            tokenId: res.tokenId,
            cachedMetadata: cachedMetadata || [],
            addMetadataToCacheAction: addMetadataToCacheAction || (() => {}),
          })
            .then((res) => {
              setMetadata(res);
            })
            .catch((err) => {
              console.log(err);
              toast.error(`Error Occured while fetching Metadata.`);
            });
        })
        .catch((err) => {
          console.log(err);
          if (JSON.stringify(err).includes("Must be valid id")) {
            toast.error(`There is No Item for id ${marketItemId}`);
          }
        });
    } else {
      toast.error(`MarketItem Id in Router (${marketItemId}) is not integer.`);
    }
  }, []);

  const onBuy = () => {
    if (!currentWallet?.address) {
      setShowConnectWalletModalAction(true);
      return;
    } else {
      setBuyLoading(true);
      buyMarketItem({
        walletAddress: currentWallet?.address,
        marketItemId: parseInt(marketItemId),
        nftContractAddress: engine.nftContractAddress,
        price: marketItem?.price,
      })
        .then((res) => {
          setBuyLoading(false);
          toast.success("Successfully Bought.");
          navigate("/profile");
        })
        .catch((err) => {
          setBuyLoading(false);
          if (err.message) {
            toast.error(err.message);
          } else {
            toast.error("Error Occured while buying.");
          }
        });
    }
  };

  const onCancel = () => {
    if (!currentWallet?.address) {
      setShowConnectWalletModalAction(true);
      return;
    } else {
      setCancelLoading(true);
      cancelMarketItem({
        walletAddress: currentWallet?.address,
        nftContractAddress: engine.nftContractAddress,
        marketItemId: marketItemId,
      })
        .then((res) => {
          setCancelLoading(false);
          toast.success("Successfully Canceled.");
          navigate("/explore");
        })
        .catch((err) => {
          setCancelLoading(false);
          if (err.message) {
            toast.error(err.message);
          } else {
            toast.error("Error Occured while canceling.");
          }
        });
    }
  };

  return (
    <>
      {!marketItem ? (
        <div className="text-center mt-5 mb-5">
          <div className="spinner-border detail_loading" role="status"></div>
        </div>
      ) : (
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
          <div className="mt-4 d-flex flex-row flex-wrap">
            <div className="col-12 col-lg-7">
              <div>
                {metadata ? (
                  metadata.nftType === "image" ? (
                    metadata.image && (
                      <CustomImage
                        className="detail_tile_image w-100"
                        alt="tile_detail"
                        src={metadata.image}
                      />
                    )
                  ) : (
                    metadata.model && (
                      <ModelViewer
                        modelPath={metadata.model}
                        style={{
                          height: 500,
                        }}
                      />
                    )
                  )
                ) : (
                  <ImageSkeleton
                    className="detail_tile_image w-100"
                    style={{ height: 300 }}
                  />
                )}
              </div>
              <div className="detail_description_container mt-4">
                {metadata ? (
                  <>
                    <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                      <h4 className="text-white">Description</h4>
                      {/* <div className="d-flex flex-wrap">
                        <div className="primary_badge me-2">1920*1080</div>
                        <div className="primary_badge">8MB</div>
                      </div> */}
                    </div>
                    <div className="description_text">
                      {metadata?.description}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div
                      className="spinner-border detail_description_loading"
                      role="status"
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-5 mt-4 mt-lg-0 p-0 ps-lg-3 pe-lg-3">
              <div className="detail_description_container">
                <div className="d-flex flex-row flex-wrap">
                  {metadata && (
                    <>
                      <div className="primary_badge m-1">
                        {metadata?.category.label}
                      </div>
                      <div className="primary_badge m-1">
                        {metadata?.collection.label}
                      </div>
                    </>
                  )}
                </div>
                <UserInfo
                  className="mt-4"
                  walletAddress={marketItem.creator}
                  label="Creator"
                />
                {!addressCompare(currentWallet?.address, marketItem.seller) && (
                  <UserInfo
                    className="mt-4"
                    walletAddress={marketItem.seller}
                    label="Seller"
                  />
                )}
                {marketItem?.owner && !isZeroAddress(marketItem?.owner) && (
                  <UserInfo
                    className="mt-4"
                    walletAddress={marketItem.owner}
                    label="Owner"
                  />
                )}
                {metadata ? (
                  <div className="mt-5">
                    <h2 className="text-white fw-bold">
                      {metadata?.name || ""}
                    </h2>
                    <div className="description_text">
                      {metadata?.description}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div
                      className="spinner-border detail_description_loading_small"
                      role="status"
                    ></div>
                  </div>
                )}
                {/* <div className="mt-4 d-flex flex-row align-items-center flex-wrap">
                  <div className="d-flex flex-row align-items-center">
                    <FiEye size={24} color="#5A5C6A" />
                    <div className="ms-2 text-white">541</div>
                  </div>
                  <div className="d-flex flex-row align-items-center ms-3">
                    <FiHeart size={24} color="#5A5C6A" />
                    <div className="ms-2 text-white">234</div>
                  </div>
                </div> */}
              </div>
              <div className="mt-4 detail_description_container">
                {metadata ? (
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="text-white">Current Price</div>
                    <div
                      style={{ color: "#767783" }}
                    >{`Royalty ${metadata?.royalty}%`}</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div
                      className="spinner-border detail_description_loading_small"
                      role="status"
                    ></div>
                  </div>
                )}
                <div className="mt-3 d-flex flex-row align-items-center">
                  <img
                    alt="ether"
                    src={window.origin + "/ether_primary.png"}
                    width={32}
                    height={32}
                  />
                  <div className="d-flex flex-row align-items-end">
                    <h2 className="text-white fw-bold m-0 ms-2">
                      {metadata?.price}
                    </h2>
                    {/* <div className="ms-2" style={{ color: "#767783" }}>
                      {"($948.83)"}
                    </div> */}
                  </div>
                </div>
                <div className="mt-4">
                  {marketItem.sold || marketItem.canceled ? (
                    <div>
                      {marketItem.sold && (
                        <div
                          className="sold_text text-center"
                          style={{ color: "rgb(98, 216, 143) !important" }}
                        >
                          Sold Out
                        </div>
                      )}
                      {marketItem.canceled && (
                        <div
                          className="text-center canceled_text"
                          style={{ color: "#e02e2e" }}
                        >
                          Canceled
                        </div>
                      )}
                    </div>
                  ) : addressCompare(
                      currentWallet?.address,
                      marketItem.seller
                    ) ? (
                    <ThirdButton
                      text="Cancel Sale"
                      className="w-100"
                      loading={cancelLoading}
                      onClick={() => {
                        onCancel();
                      }}
                    />
                  ) : (
                    <PrimaryButton
                      text="Buy Now"
                      className="w-100"
                      loading={buyLoading}
                      onClick={() => {
                        onBuy();
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
  cachedMetadata: state.cachedMetadata.metadata,
});
const mapDispatchToProps = (dispatch) => ({
  addMetadataToCacheAction: (data) => addMetadataToCacheAction(dispatch, data),
  setShowConnectWalletModalAction: (data) =>
    setShowConnectWalletModalAction(dispatch, data),
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
