import React, { useState, memo } from "react";

// import components
import ImageSkeleton from "@/components/ImageSkeleton";
import CustomImage from "@/components/CustomImage";
import ModelViewer from "../../ModelViewer";

// import icons
import { BsHeart } from "react-icons/bs";

const PreviewTile = ({ metadata, className = "", showTopIcons = true }) => {
  const { imagePath, nftType, modelPath } = metadata;

  const [feedbackCount, setFeedbackCount] = useState(0);

  const isLoadable =
    nftType.value === "image"
      ? imagePath && imagePath.length > 0
      : modelPath && modelPath.length > 0;

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
          <div className="tile_auction_time">0h 25m 45s</div>
        </div>
      )}

      {!isLoadable && (
        <ImageSkeleton
          style={{ borderRadius: 16, backgroundColor: "#282932", height: 200 }}
        />
      )}
      {nftType.value === "image"
        ? imagePath && (
            <CustomImage
              className="tile_image w-100"
              src={imagePath}
              alt="tile_image"
            />
          )
        : modelPath && <ModelViewer modelPath={modelPath} />}

      <div className="tile_description">
        <div style={{ color: "white", fontSize: "20px" }}>
          {metadata.name || "Unnamed"}
        </div>
        <div style={{ color: "#5A5C6A" }}>
          {metadata.description || "No Description"}
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
              style={{ color: "white", fontSize: "20px", marginLeft: "8px" }}
            >
              {(metadata.price || 0) + " ETH"}
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
      </div>
    </div>
  );
};

export default memo(PreviewTile);
