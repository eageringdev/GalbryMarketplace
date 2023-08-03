import React, { useState } from "react";
import "./index.scss";

// import components
import PrimaryComboBox from "@/components/PrimaryComboBox";

// import icons
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const currencyOptions = [
  { label: "ETH", value: "eth" },
  { label: "BNB", value: "bnb" },
  { label: "BUSD", value: "busd" },
];

const PriceInput = ({ values, errors, onChangeValue }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);

  return (
    <div>
      <div className="w-100 d-flex flex-row align-items-center justify-content-between">
        <div className="section_title">Price Input</div>
        <span
          className="btn"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {isCollapsed ? (
            <BsChevronDown size={20} color="white" />
          ) : (
            <BsChevronUp size={20} color="white" />
          )}
        </span>
      </div>
      <div
        className="price_input"
        style={{
          display: isCollapsed ? "none" : "block",
        }}
      >
        <div className="pt-3 pb-3">
          <div className="divider"></div>
        </div>
        {/* Start Item Price */}
        <div className="control_field">
          <div className="label">Item Price*</div>
          <div
            className="d-flex flex-row"
            style={{
              borderRadius: 8,
              border: errors.price ? "1px solid #e02e2e" : "",
            }}
          >
            <input
              className="primary_input w-100"
              name="item_price"
              placeholder="Enter Item Price"
              style={{
                borderRadius: "8px 0px 0px 8px",
              }}
              type="number"
              value={values.price}
              onChange={(event) => {
                onChangeValue("price", event.target.value);
              }}
            />
            <PrimaryComboBox
              currentValue={selectedCurrency}
              name="currency"
              containerClassName="primary_combo_box_container_with_input"
              placeholder={"Select Currency"}
              options={currencyOptions}
              onChangeValue={(value) => {
                setSelectedCurrency(value);
              }}
            />
          </div>
          {errors.price && (
            <div className="mt-1 ms-2 primary_input_error">{errors.price}</div>
          )}
        </div>
        {/* End Item Price */}

        {/* Start Item Royalties */}
        <div className="control_field">
          <div className="label">Royalty*</div>
          <div
            className="d-flex flex-row"
            style={{
              borderRadius: 8,
              border: errors.royalty ? "1px solid #e02e2e" : "",
            }}
          >
            <input
              className="primary_input w-100"
              name="item_royalty"
              placeholder="Enter Item Royalty"
              style={{
                borderRadius: "8px 0px 0px 8px",
              }}
              type="number"
              value={values.royalty}
              onChange={(event) => {
                onChangeValue("royalty", event.target.value);
              }}
            />
            <div
              style={{
                borderRadius: "0px 8px 8px 0px",
                backgroundColor: "#484848",
              }}
              className="text-white d-flex align-items-center justify-content-center p-3"
            >
              %
            </div>
          </div>
          {errors.royalty && (
            <div className="mt-1 ms-2 primary_input_error">
              {errors.royalty}
            </div>
          )}
        </div>
        {/* End Item Royalties */}
      </div>
    </div>
  );
};

export default PriceInput;
