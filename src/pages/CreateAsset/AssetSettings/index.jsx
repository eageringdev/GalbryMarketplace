import React, { useState } from "react";
import "./index.scss";

// import components
import PrimaryComboBox from "@/components/PrimaryComboBox";
import Modal from "react-modal";
import AddCollection from "@/components/AddCollection";

// import icons
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import categoryOptions from "./categoryOptions.json";
import PrimaryInput from "../../../components/Inputs/PrimaryInput";
const collectionOptions = [
  { label: "Collection 1", value: "collection_1" },
  { label: "Collection 2", value: "collection_2" },
  { label: "Collection 3", value: "collection_3" },
];

const addCollectionModalStyle = {
  content: {
    top: "50%",
    marginTop: 48,
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "70%",
    minWidth: "300px",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "#111111AA",
    zIndex: 4,
    overflow: "auto",
  },
};

const AssetSettings = ({ values, errors, onChangeValue }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [showCollectionModal, setShowCollectionModal] = useState(false);

  const renderAddCollectionModal = () => {
    return (
      <Modal
        isOpen={showCollectionModal}
        onAfterOpen={() => {
          document.body.style.overflow = "hidden";
        }}
        onRequestClose={() => {
          setShowCollectionModal(false);
          document.body.style.overflow = "auto";
        }}
        style={addCollectionModalStyle}
        contentLabel="New Collection"
      >
        <AddCollection
          onClose={() => {
            setShowCollectionModal(false);
            document.body.style.overflow = "auto";
          }}
        />
      </Modal>
    );
  };

  return (
    <div>
      {renderAddCollectionModal()}
      <div className="w-100 d-flex flex-row align-items-center justify-content-between">
        <div className="section_title">Asset Settings</div>
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
        className="asset_settings"
        style={{
          display: isCollapsed ? "none" : "block",
        }}
      >
        <div className="pt-3 pb-3">
          <div className="divider"></div>
        </div>
        {/* Start Item Name */}
        <PrimaryInput
          name="item_name"
          label="Item Name*"
          value={values.name}
          onChange={(event) => {
            onChangeValue("name", event.target.value);
          }}
          placeholder="Enter Item Name"
          error={errors.name}
        />
        {/* End Item Name */}

        {/* Start Category */}
        <div className="control_field">
          <div className="label">Category</div>
          <PrimaryComboBox
            currentValue={values.category}
            name="Categories"
            placeholder={"Select Category"}
            options={categoryOptions}
            error={errors.category}
            searchable
            onChangeValue={(value) => {
              onChangeValue("category", value);
            }}
          />
        </div>
        {/* End Category */}

        {/* Start Description */}
        <PrimaryInput
          name="item_description"
          label="Description*"
          value={values.description}
          onChange={(event) => {
            onChangeValue("description", event.target.value);
          }}
          placeholder="Provide a detailed description of your item."
          multiple
          error={errors.description}
        />
        {/* End Description */}

        {/* Start Collection */}
        <div className="control_field">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="label">Collection</div>
            <div
              onClick={() => {
                setShowCollectionModal(true);
              }}
              style={{ color: "#ce3475" }}
              className="btn border-0"
            >
              Add Collection
            </div>
          </div>
          <PrimaryComboBox
            currentValue={values.collection}
            name="collection"
            placeholder={"Select Collection"}
            options={collectionOptions}
            onChangeValue={(value) => {
              onChangeValue("collection", value);
            }}
            error={errors.collection}
          />
        </div>
        {/* End Collection */}
      </div>
    </div>
  );
};

export default AssetSettings;
