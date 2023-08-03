import React, { useState } from "react";
import "./index.scss";

// import utils
import classnames from "classnames";

// import icons
import { BsSearch } from "react-icons/bs";

const PrimaryComboBox = ({
  className = "",
  options = [],
  currentValue,
  name,
  placeholder,
  error,
  searchable = false,
  onChangeValue,
  containerClassName = "primary_combo_box_container",
  style = {},
}) => {
  const [searchValue, setSearchValue] = useState("");

  let refinedOptions = [];
  if (searchable && searchValue.length > 0) {
    refinedOptions = options.filter((option) => {
      if (option.label.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });
  } else {
    refinedOptions = options;
  }

  return (
    <div
      className={"dropdown primary_combo_box " + className}
      style={style || {}}
    >
      <button
        className={
          "dropdown-toggle align-items-center justify-content-between w-100 " +
          containerClassName +
          (error ? " has_error" : "")
        }
        type="button"
        id={"dropdownMenuButton_" + name}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          minWidth: 100,
        }}
      >
        {currentValue ? currentValue.label : placeholder || name}
      </button>
      <div
        className="dropdown-menu w-100"
        style={{
          minWidth: searchable ? 300 : 142,
        }}
      >
        {searchable && (
          <div className="primary_combo_box_search_input_container">
            <BsSearch className="primary_combo_box_search_input_icon" />
            <input
              name="search"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              placeholder="Search Categories"
              className="primary_combo_box_search_input"
            />
          </div>
        )}
        <div className="primary_combo_box_item_container pe-2">
          {refinedOptions.map((option) => (
            <div
              key={option.value}
              className={classnames(
                "primary_combo_box_item hover-underline-animation",
                {
                  active: currentValue?.value == option.value,
                }
              )}
              onClick={() => {
                onChangeValue(option);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      {error && <div className="mt-1 ms-2 primary_input_error">{error}</div>}
    </div>
  );
};

export default PrimaryComboBox;
