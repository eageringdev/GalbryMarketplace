import React from "react";
import "./index.scss";

// import components
import { PrimaryButton, ThirdButton } from "@/components/Buttons";

// import icons
import { MdOutlineClose } from "react-icons/md";

const AddCollection = ({ onClose }) => {
  return (
    <div className="add_collection_container">
      <div className="title">New Collection</div>
      <div className="close_button_container">
        <MdOutlineClose
          style={{ cursor: "pointer" }}
          size={24}
          color="white"
          onClick={() => {
            onClose();
          }}
        />
      </div>
      {/* Start Collection Name */}
      <div className="control_field mt-4">
        <div className="label">Collection Name*</div>
        <input
          className="primary_input w-100"
          name="collection_name"
          placeholder="Enter Collection Name"
        />
      </div>
      {/* End Collection Name */}
      {/* Start Description */}
      <div className="control_field">
        <div className="label">Description*</div>
        <textarea
          className="primary_input w-100"
          name="collection_description"
          placeholder="Provide a detailed description of your collection."
          rows={4}
        ></textarea>
      </div>
      {/* End Description */}

      {/* Start Collection Image */}
      <div className="mt-2 d-flex flex-wrap w-100 align-items-center p-3">
        <div style={{ width: 64, height: 64 }}>
          <img
            width={64}
            height={64}
            alt="image_placeholder"
            src={window.origin + "/create-asset/dropzone.svg"}
          />
        </div>
        <div className="col-1 col-md-2 col-lg-3"></div>
        <div className="col">
          <div className="text-white mb-2">Collection image</div>
          <ThirdButton className="w-100" text="Upload" onClick={() => {}} />
        </div>
        <div className="col-3"></div>
      </div>
      {/* End Collection Image */}

      {/* Start Collection Symbol */}
      <div className="mt-2 d-flex flex-wrap w-100 align-items-center p-3">
        <div style={{ width: 64, height: 64 }}>
          <img
            className="w-100"
            alt="image_placeholder"
            src={window.origin + "/create-asset/dropzone.svg"}
          />
        </div>
        <div className="col-1 col-md-2 col-lg-3"></div>
        <div className="col">
          <div className="text-white mb-2">Collection symbol</div>
          <ThirdButton className="w-100" text="Upload" onClick={() => {}} />
        </div>
        <div className="col-3"></div>
      </div>
      {/* End Collection Symbol */}
      <div className="mt-4">
        <PrimaryButton text="Publish" className="w-100" onClick={() => {}} />
      </div>
    </div>
  );
};

export default AddCollection;
