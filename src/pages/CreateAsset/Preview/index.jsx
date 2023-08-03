import React from "react";

// import components
import { PreviewTile } from "@/components/Tile";
import { PrimaryButton, ThirdButton } from "@/components/Buttons";

const Preview = ({ metadata, onSave, onPublish, publishLoading }) => {
  return (
    <div className="preview_section mt-4 mt-lg-0 p-0 ps-lg-4 pe-lg-4">
      <div className="section_title">Preview</div>
      <div className="mt-3">
        <PreviewTile
          showTopIcons={false}
          className="w-100"
          metadata={metadata}
        />
      </div>
      <div className="mt-4">
        <ThirdButton
          text="Save"
          onClick={() => {
            onSave();
          }}
          hoverText="Coming Soon!"
          className="w-100"
          style={{
            minWidth: 256,
          }}
          disabled={publishLoading}
        />
      </div>
      <div className="mt-3">
        <PrimaryButton
          text="Publish"
          onClick={() => {
            onPublish();
          }}
          className="w-100"
          style={{
            minWidth: 256,
          }}
          loading={publishLoading}
        />
      </div>
      {/* <div className="mt-4 d-flex align-items-center justify-content-center">
        <img
          alt="auto_save"
          src={window.origin + "/create-asset/autosave.svg"}
        />
        <div className="ms-2" style={{ color: "#9598AE" }}>
          Auto-saving is enable
        </div>
      </div> */}
    </div>
  );
};

export default Preview;
