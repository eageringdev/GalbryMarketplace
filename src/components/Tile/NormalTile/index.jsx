import React, { useState, useEffect, memo } from "react";

// import components
import ImageSkeleton from "@/components/ImageSkeleton";
import CustomImage from "@/components/CustomImage";
import ModelViwer from "@/components/ModelViewer";

// import icons
import { BsHeart } from "react-icons/bs";

// import utils
import axios from "axios";

const NormalTile = ({ tokenURI, className = "", showTopIcons = true }) => {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    axios
      .get(tokenURI)
      .then((res) => {
        if (res.marketItemId != metadata?.marketItemId) {
          setMetadata(res);
        }
      })
      .catch((err) => {
        console.log("Fetch Metadata ERROR: ", err);
        setMetadata(null);
      });
  }, []);

  const isLoadable = metadata ? true : false;
  return (
    <div className={"tile " + className} onClick={() => {}}>
      {showTopIcons && (
        <div className="tile_top_icons">
          <img
            alt="top_icon"
            src={window.origin + "/tiles/top_icon.png"}
            width={24}
            height={24}
          />
          {/* <div className="tile_auction_time">0h 25m 45s</div> */}
        </div>
      )}

      {!isLoadable && (
        <ImageSkeleton
          style={{ borderRadius: 16, backgroundColor: "#282932", height: 200 }}
        />
      )}
      {isLoadable &&
        (metadata?.nftType === "image"
          ? metadata?.image && (
              <CustomImage
                className="tile_image"
                src={metadata.image}
                alt="tile_image"
              />
            )
          : metadata?.model && <ModelViwer modelPath={metadata.model} />)}

      <div className="tile_description">
        {isLoadable ? (
          <>
            <div style={{ color: "white", fontSize: "20px" }}>
              {metadata?.name || "Unnamed"}
            </div>
            <div style={{ color: "#5A5C6A" }}>
              {metadata?.description || "No description"}
            </div>
            <div className="tile_description_detail mb-3">
              <div className="price_panel">
                <img
                  alt="ether_image"
                  src={window.origin + "/ether_primary.png"}
                  height={20}
                  width={20}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginLeft: "8px",
                  }}
                >
                  {metadata?.price || "Not Defined."}
                </div>
                {/* <div
              style={{ fontSize: "20px", marginLeft: "12px", color: "#5a5c6a" }}
            >
              1/12
            </div> */}
              </div>
              {/* <div className="feedback_panel">
                <BsHeart
                  className="feedback_icon"
                  size={20}
                  onClick={() => {
                    setFeedbackCount(feedbackCount + 1);
                  }}
                />
                <div className="feedback_count ms-2 text-white">
                  {feedbackCount}
                </div>
              </div> */}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div
              className="spinner-border tile_description_loading"
              role="status"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(NormalTile);
