import React from "react";
import "./index.scss";

const PrimaryButton = ({
  text,
  textSize = 16,
  icon,
  onClick,
  className = "",
  style = {},
  loading = false,
  disabled = false,
  id,
}) => {
  return (
    <button
      disabled={disabled || loading}
      id={id}
      className={
        "primary_button " + (disabled || loading ? "disabled " : "") + className
      }
      onClick={onClick}
      style={{
        fontSize: textSize,
        ...style,
      }}
    >
      <div className="d-flex flex-row align-items-center justify-content-center">
        {!loading && (
          <>
            {icon}
            {text}
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

export default PrimaryButton;
