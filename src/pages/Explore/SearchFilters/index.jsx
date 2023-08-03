import React, { useState } from "react";
import "./index.scss";

// import components
import ComboBox from "../../../components/ComboBox";

// import icons
import { BsSearch } from "react-icons/bs";

// define constants
const salesTypeOptions = [
  { label: "All", value: "all" },
  { label: "On Auction", value: "on_auction" },
  { label: "Has Offers", value: "has_offers" },
  { label: "Fixed Price", value: "fixed_price" },
];
const itemTypeOptions = [
  { label: "All Items", value: "all" },
  { label: "Single Item", value: "single" },
  { label: "Bundle", value: "bundle" },
];
import categoryOptions from "./categoryOptions.json";
const sortingOptions = [
  { label: "Lowest Price", value: "lowest_price" },
  { label: "Highest Price", value: "highest_price" },
  { label: "Oldest", value: "oldest" },
  { label: "Newest", value: "newest" },
  { label: "Auction Ending Soon", value: "auction_ending_soon" },
];

const SearchFilters = () => {
  const [category, setCategory] = useState(null);
  const [salesType, setSalesType] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [sortingType, setSortingType] = useState(null);

  const [searchAssetsValue, setSearchAssetsValue] = useState("");

  return (
    <div className="search_filters_section">
      <div className="search_filters_panel justify-content-center justify-content-xl-start col-12 col-xl-6 me-auto">
        <ComboBox
          currentValue={category}
          name="Categories"
          options={categoryOptions}
          className="m-1 me-md-2"
          searchable
          onChangeValue={(value) => {
            setCategory(value);
          }}
        />
        <ComboBox
          currentValue={salesType}
          name="Sale Type"
          options={salesTypeOptions}
          className="m-1 me-md-2"
          onChangeValue={(value) => {
            setSalesType(value);
          }}
        />
        <ComboBox
          currentValue={itemType}
          name="Item Type"
          options={itemTypeOptions}
          className="m-1 me-md-2"
          onChangeValue={(value) => {
            setItemType(value);
          }}
        />
      </div>
      <div className="search_filters_panel justify-content-center justify-content-xl-end col-12 col-xl-6 ms-auto mt-2 mt-xl-0">
        <div className="search_filter_input_container m-1 me-md-2">
          <BsSearch className="search_filter_input_icon" />
          <input
            name="search_assets"
            value={searchAssetsValue}
            onChange={(event) => {
              setSearchAssetsValue(event.target.value);
            }}
            placeholder="Search Assets"
            className="search_filter_input"
          />
        </div>
        <ComboBox
          currentValue={sortingType}
          className="m-1"
          name="Sorting"
          options={sortingOptions}
          onChangeValue={(value) => {
            setSortingType(value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchFilters;
