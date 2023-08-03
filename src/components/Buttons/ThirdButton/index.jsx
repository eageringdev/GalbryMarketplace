import React, { useState } from "react";
import "./index.scss";

const ThirdButton = ({
  text,
  hoverText = "",
  textSize = 16,
  icon,
  onClick,
  style = {},
  className = "",
  loading = false,
  disabled = false,
  id,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      disabled={disabled || loading}
      id={id}
      className={
        "third_button " + (disabled || loading ? "disabled " : "") + className
      }
      onClick={onClick}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      style={{
        fontSize: textSize,
        ...style,
      }}
    >
      <div className="d-flex flex-row align-items-center justify-content-center">
        {!loading && (
          <>
            {icon}
            {isHover ? hoverText || text : text}
          </>
        )}
        {loading && (
          <div
            className="spinner-border"
            role="status"
            style={{
              fontSize: "12px",
              width: "24px",
              height: "24px",
            }}
          ></div>
        )}
      </div>
    </button>
  );
};

export default ThirdButton;
