import React, { useState } from "react";
import "./index.scss";

// import utils
import classnames from "classnames";

const IconComboBox = ({
  className = "",
  options = [],
  currentValue,
  name,
  onChangeValue,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={"dropdown icon_combo_box " + className}>
      <button
        className="icon_combo_box_container dropdown-toggle align-items-center justify-content-between w-100"
        type="button"
        id={"dropdownMenuButton_" + name}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="d-flex align-items-center">
          {currentValue?.iconPath && (
            <img
              className="me-3"
              width={32}
              height={32}
              alt={currentValue.value + "_icon"}
              src={currentValue.iconPath}
            />
          )}
          {currentValue ? currentValue.label : name}
        </div>
      </button>
      <div className="dropdown-menu">
        <div className="icon_combo_box_item_container pe-2">
          {options.map((option) => (
            <div
              key={option.value}
              className={classnames(
                "icon_combo_box_item hover-underline-animation",
                {
                  active: currentValue?.value == option.value,
                }
              )}
              onClick={() => {
                onChangeValue(option);
              }}
            >
              <img
                className="me-3"
                width={32}
                height={32}
                alt={option.value + "_icon"}
                src={option.iconPath}
              />
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconComboBox;
