import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { addMetadataToCacheAction } from "../../store/actions/MetadataCacheActions";

// import components
import CustomImage from "../CustomImage";
import ModelViewer from "../ModelViewer";
import { toast } from "react-toastify";

// import constants
import { engine } from "../../constants";

// import utils
import { getMetadata } from "../../utils/wallets/nft";
import shortenString from "../../utils/common/shortenString";

const descriptionShowLength = 20;

const Asset = ({ tokenId, cachedMetadata, addMetadataToCacheAction }) => {
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    getMetadata({
      nftContractAddress: engine.nftContractAddress,
      tokenId: tokenId,
      cachedMetadata: cachedMetadata || [],
      addMetadataToCacheAction: addMetadataToCacheAction || (() => {}),
    })
      .then((res) => {
        setMetadata(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClick = () => {
    if (!metadata) {
      return;
    }
    if (!metadata.marketItemId) {
      toast.error("No market data for this asset.");
      return;
    }
    navigate(`/detail/${metadata.marketItemId}`);
  };

  return (
    <div
      className="asset_container"
      onClick={() => {
        onClick();
      }}
    >
      {metadata ? (
        <>
          {metadata.nftType === "image"
            ? metadata.image && (
                <CustomImage
                  className="asset_image"
                  src={metadata.image}
                  alt="asset"
                />
              )
            : metadata.model && (
                <ModelViewer
                  modelPath={metadata.model}
                  style={{ height: 250 }}
                />
              )}
          <div className="mt-3">
            <div style={{ color: "white", fontSize: "20px" }}>
              {metadata.name || "Unnamed"}
            </div>
            <div style={{ color: "#5A5C6A" }}>
              {shortenString(
                metadata.description || "No Description",
                descriptionShowLength
              )}
            </div>
          </div>
          <div className="asset_divider mt-2"></div>
          <div className="mt-2 d-flex flex-row align-items-center justify-content-between">
            <div style={{ color: "#5A5C6A" }}>Price:</div>
            <div className="d-flex flex-row align-items-center">
              <div className="text-white fw-bold">{metadata?.price}</div>
              <img
                alt="ether"
                className="ms-2"
                src={window.origin + "/ether_secondary.png"}
                width={18}
                height={18}
              />
            </div>
          </div>
        </>
      ) : (
        <div
          className="text-center d-flex flex-row align-items-center justify-content-center"
          style={{
            height: 296,
          }}
        >
          <div className="spinner-border asset_loading" role="status"></div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cachedMetadata: state.cachedMetadata.metadata,
});
const mapDispatchToProps = (dispatch) => ({
  addMetadataToCacheAction: (data) => addMetadataToCacheAction(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Asset);
