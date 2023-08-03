import axios from "axios";

const uploadImageToPinata = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pinataOptions", '{"cidVersion": 1}');
      formData.append("pinataMetadata", '{"name": "ReitioNFT"}');

      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
          pinata_secret_api_key: `${
            import.meta.env.VITE_PINATA_SECRET_API_KEY
          }`,
          "Content-Type": "multipart/form-data",
        },
      });
      const imagePath = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      resolve(imagePath);
    } catch (err) {
      console.log("uploadImageToPinata: error: ", err);
      reject(err);
    }
  });
};

const uploadJSONToPinata = (metadata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pinataJSONBody = {
        pinataOptions: {
          cidVersion: 1,
        },
        pinataContent: metadata,
      };
      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: JSON.stringify(pinataJSONBody),
        headers: {
          pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
          pinata_secret_api_key: `${
            import.meta.env.VITE_PINATA_SECRET_API_KEY
          }`,
          "Content-Type": "application/json",
        },
      });
      const tokenURI = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      resolve(tokenURI);
    } catch (err) {
      console.log("uploadJSONToPinata: error: ", err);
      reject(err);
    }
  });
};

export { uploadImageToPinata, uploadJSONToPinata };
