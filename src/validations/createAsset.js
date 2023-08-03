const createAssetValidation = (data) => {
  let errors = {};
  if (!data.assetFile) {
    errors.assetFile = "Asset File is required.";
  }
  if (!(data.name && typeof data.name === "string" && data.name.length > 0)) {
    errors.name = "Item Name is required.";
  }
  if (
    !(
      data.description &&
      typeof data.description === "string" &&
      data.description.length > 0
    )
  ) {
    errors.description = "Item Description is required.";
  }
  if (!data.category) {
    errors.category = "Item Category is required.";
  }

  if (Number(data?.price) !== parseFloat(data?.price)) {
    errors.price = "Must be valid number.";
  }
  if (parseFloat(data?.price) <= 0) {
    errors.price = "Must be greater than 0.";
  }
  if (!data.price) {
    errors.price = "Item Price is required.";
  }

  if (Number(data?.royalty) !== parseFloat(data?.royalty)) {
    errors.royalty = "Must be valid number.";
  }
  if (!(parseFloat(data?.royalty) >= 0 && parseFloat(data?.royalty) <= 100)) {
    errors.royalty = "Must be between 0 and 100.";
  }
  if (!data.royalty) {
    errors.royalty = "Item Royalty is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      isValid: false,
      assetSettingsErrors: {
        name: errors.name || "",
        category: errors.category || "",
        description: errors.description || "",
        collection: errors.collection || "",
      },
      priceInputErrors: {
        price: errors.price || "",
        royalty: errors.royalty || "",
      },
    };
  }
  return {
    errors: {},
    isValid: true,
  };
};

export default createAssetValidation;
