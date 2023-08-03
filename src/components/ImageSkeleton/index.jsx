import React from "react";
import "./index.scss";

const ImageSkeleton = ({ style = {}, className = "" }) => {
  return (
    <div className={"load-wraper " + className} style={style}>
      <div className="activity"></div>
    </div>
  );
};

export default ImageSkeleton;
