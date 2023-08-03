import React, { useState } from "react";
import "./index.scss";

// import utils
import classnames from "classnames";

// import icons
import { BsSearch } from "react-icons/bs";

const ComboBox = ({
  className = "",
  options = [],
  currentValue,
  name,
  searchable = false,
  onChangeValue,
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
    <div className={"dropdown combo_box " + className}>
      <button
        className="combo_box_container dropdown-toggle align-items-center justify-content-between"
        type="button"
        id={"dropdownMenuButton_" + name}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          minWidth: 100,
        }}
      >
        {currentValue ? currentValue.label : name}
      </button>
      <div
        className="dropdown-menu"
        style={{
          minWidth: searchable ? 300 : 142,
        }}
      >
        {searchable && (
          <div className="combo_box_search_input_container">
            <BsSearch className="combo_box_search_input_icon" />
            <input
              name="search"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              placeholder="Search Categories"
              className="combo_box_search_input"
            />
          </div>
        )}
        <div className="combo_box_item_container pe-2">
          {refinedOptions.map((option) => (
            <div
              key={option.value}
              className={classnames(
                "combo_box_item hover-underline-animation",
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
    </div>
  );
};

export default ComboBox;
