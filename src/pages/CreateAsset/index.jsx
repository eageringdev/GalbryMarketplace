import React, { useState, useEffect } from "react";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { createAsset } from "../../store/actions/AssetActions";
import { setShowConnectWalletModalAction } from "@/store/actions/WalletActions";

// import router
import { useNavigate } from "react-router-dom";

// import components
import MyDropzone from "@/components/Dropzone";
import AssetSettings from "./AssetSettings";
import { toast } from "react-toastify";

// import icons
import { AiOutlineLeft } from "react-icons/ai";
import PriceInput from "./PriceInput";
import Preview from "./Preview";

// import validations
import { createAssetValidation } from "../../validations";

// import utils
import toBase64 from "@/utils/common/toBase64";

const nftTypeOptions = [
  { label: "Image", value: "image" },
  { label: "3D Objects", value: "3d" },
];

const CreateAsset = ({
  currentWallet,
  createAsset,
  setShowConnectWalletModalAction,
}) => {
  const navigate = useNavigate();

  const [publishLoading, setPublishLoading] = useState(false);
  const [assetFile, setAssetFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [modelPath, setModelPath] = useState("");
  // const [nftType, setNftType] = useState(nftTypeOptions[0]);

  // values
  const [assetSettingsValues, setAssetSettingsValues] = useState({
    name: "",
    category: null,
    description: "",
    collection: { label: "Collection 1", value: "collection_1" },
  });
  const [priceInputValues, setPriceInputValues] = useState({
    price: "",
    royalty: "",
  });
  // error
  const [assetSettingsErrors, setAssetSettingsErrors] = useState({
    name: "",
    category: "",
    description: "",
    collection: "",
  });
  const [priceInputErrors, setPriceInputErrors] = useState({
    price: "",
    royalty: "",
  });
  const [assetFileError, setAssetFileError] = useState("");

  useEffect(() => {
    if (!(currentWallet && currentWallet.address)) {
      setShowConnectWalletModalAction(true);
    }
  }, []);

  const onChangeFile = (file) => {
    if (file) {
      setAssetFile(file);
      setAssetFileError("");
      toBase64(file)
        .then((res) => {
          setPreview(res);
        })
        .catch((err) => {
          console.log(err);
          setPreview("");
        });
    } else {
      setAssetFile(file);
      setModelPath("");
      setAssetFileError("");
      setPreview("");
    }
  };

  const onSave = () => {};

  const onPublish = () => {
    setPublishLoading(true);
    const validationRes = createAssetValidation({
      assetFile: assetFile,
      ...assetSettingsValues,
      ...priceInputValues,
    });
    if (!validationRes.isValid) {
      setAssetSettingsErrors(validationRes.assetSettingsErrors);
      setPriceInputErrors(validationRes.priceInputErrors);
      setAssetFileError(validationRes.errors.assetFile);
      toast.error("Fill the Form Correctly!");
      setPublishLoading(false);
      return;
    } else {
      if (!(currentWallet && currentWallet?.address)) {
        toast.warning("Please connect to your wallet!");
        setShowConnectWalletModalAction(true);
        setPublishLoading(false);
        return;
      }
      setPublishLoading(true);
      createAsset({
        assetFile: assetFile,
        ...assetSettingsValues,
        ...priceInputValues,
        walletAddress: currentWallet?.address,
        nftType: nftTypeOptions[1],
      })
        .then((res) => {
          setPublishLoading(false);
          toast.success("Successfully Created.");
          navigate("/explore");
        })
        .catch((err) => {
          setPublishLoading(false);
          if (err.message) {
            toast.error(err.message || "Error Occured!");
          } else {
            toast.error("Error Occured!");
          }
        });
    }
  };

  return (
    <>
      <div
        className="top_back_link"
        onClick={() => {
          navigate(-1);
        }}
      >
        <AiOutlineLeft className="me-1" />
        Back
      </div>
      <div className="mt-4 d-flex flex-row flex-wrap">
        <div className="col-12 col-lg-8">
          {/* <div className="p-4 asset_info_section mt-2 mb-4">
            <div className="text-white mb-2">NFT Type*</div>
            <PrimaryComboBox
              currentValue={nftType}
              name="NFT Type"
              placeholder={"Select NFT Type"}
              options={nftTypeOptions}
              onChangeValue={(value) => {
                onChangeFile(undefined);
                setNftType(value);
              }}
            />
          </div> */}
          <div className="p-4 asset_info_section">
            <MyDropzone
              onChangeFile={onChangeFile}
              file={assetFile}
              error={assetFileError}
              nftType={nftTypeOptions[1]}
              modelPath={modelPath}
              onChangeModelPath={(path) => {
                setModelPath(path);
              }}
            />
          </div>
          <div className="mt-4 p-4 asset_info_section">
            <AssetSettings
              values={assetSettingsValues}
              errors={assetSettingsErrors}
              onChangeValue={(name, value) => {
                setAssetSettingsValues({
                  ...assetSettingsValues,
                  [name]: value,
                });
                setAssetSettingsErrors({ ...assetSettingsErrors, [name]: "" });
              }}
            />
          </div>
          <div className="mt-4 p-4 asset_info_section">
            <PriceInput
              values={priceInputValues}
              errors={priceInputErrors}
              onChangeValue={(name, value) => {
                setPriceInputValues({
                  ...priceInputValues,
                  [name]: value,
                });
                setPriceInputErrors({ ...priceInputErrors, [name]: "" });
              }}
            />
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <Preview
            metadata={{
              imagePath: preview,
              nftType: nftTypeOptions[1],
              modelPath,
              ...assetSettingsValues,
              ...priceInputValues,
            }}
            onSave={onSave}
            onPublish={onPublish}
            publishLoading={publishLoading}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
});
const mapDispatchToProps = (dispatch) => ({
  createAsset: (data) => createAsset(dispatch, data),
  setShowConnectWalletModalAction: (data) =>
    setShowConnectWalletModalAction(dispatch, data),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateAsset);
