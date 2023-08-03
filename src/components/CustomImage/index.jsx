import React, { useState } from "react";
import "./index.scss";

// import components
import ImageSkeleton from "@/components/ImageSkeleton";

const CustomImage = ({
  alt = "",
  className = "",
  style = {},
  src,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <img
        alt={alt}
        onLoad={() => {
          setLoading(false);
        }}
        style={style}
        className={loading ? "custom_image_hide w-100 " : "" + className}
        src={src}
        {...rest}
      />

      {loading && (
        <ImageSkeleton className={className} style={style} {...rest} />
      )}
    </>
  );
};

export default CustomImage;
