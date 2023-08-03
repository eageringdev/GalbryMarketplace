import React, { useCallback } from "react";
import "./index.scss";

// import dropzone
import { useDropzone } from "react-dropzone";

// import for 3d
import ModelViewer from "../ModelViewer";

const MyDropzone = ({
  file,
  modelPath,
  onChangeModelPath,
  onChangeFile,
  error,
  nftType,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      onChangeFile(acceptedFiles[0]);
      onChangeModelPath(
        (window.URL || window.webkitURL).createObjectURL(acceptedFiles[0])
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      nftType.value === "image"
        ? {
            "image/*": [".jpeg", ".png"],
          }
        : {
            "image/glb": [".glb", ".gltf"],
          },
    multiple: false,
  });

  const filePanel = (
    <>
      {file ? (
        <ul className="m-0">
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        </ul>
      ) : (
        <div className="text-center">Select Media for Your Asset.</div>
      )}
    </>
  );

  return (
    <>
      <div
        className="dropzone_container"
        style={{
          opacity: isDragActive ? 0.5 : 1,
        }}
      >
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <img
            alt="dropzone"
            src={window.origin + "/create-asset/dropzone.svg"}
          />
          <div className="mt-3 text-white dropzone_text">
            Drag and drop your file here, or{" "}
            <span style={{ color: "#E11476" }}>browse</span>
          </div>
          <div
            className="mt-1"
            style={{
              color: isDragActive ? "#E11476" : "#676672",
              fontSize: isDragActive ? 20 : 16,
              fontWeight: isDragActive ? "bold" : "initial",
            }}
          >
            {nftType.value === "image"
              ? "Supports: JPG, PNG, GIF... and max size 100MB"
              : "Supports: GLB, GLTF and max size 100MB"}
          </div>
        </div>
      </div>
      <div
        className={"dropzone_file_container mt-4 " + (error ? "has_error" : "")}
      >
        {filePanel}
        {error && <div className="error text-center mt-1">{error}</div>}
      </div>
      {nftType.value === "3d" && (
        <div>
          {/* <ModelViewer
            modelPath={modelPath}
            errorMessageComponent={
              <div className="text-white">Not a Valid File Type.</div>
            }
          /> */}
        </div>
      )}
    </>
  );
};

export default MyDropzone;
