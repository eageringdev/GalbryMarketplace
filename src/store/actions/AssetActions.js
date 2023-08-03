import { utils } from "ethers";

// import utils
import { engine } from "../../constants";
import {
  uploadImageToPinata,
  uploadJSONToPinata,
} from "../../utils/common/upload";
import { createMarketItem } from "../../utils/wallets/marketplace";
import { mintNFT } from "../../utils/wallets/nft";

export const createAsset = (dispatch, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const assetPath = await uploadImageToPinata(data.assetFile);
      const { walletAddress, nftType } = data;
      const metadata = Object.assign(
        {
          name: data.name,
          description: data.description,
          category: data.category,
          collection: data.collection,
          price: data.price,
          royalty: parseFloat(data.royalty),
          nftType: nftType.value,
        },
        nftType.value === "image"
          ? { image: assetPath }
          : {
              model: assetPath,
            }
      );
      const tokenURI = await uploadJSONToPinata(metadata);
      const mintRes = await mintNFT({ walletAddress, tokenURI });
      const marketRes = await createMarketItem({
        walletAddress,
        nftContractAddress: engine.nftContractAddress,
        tokenId: mintRes.logs[0].topics[3],
        price: utils.parseEther(data.price.toString()),
      });
      resolve(mintRes);
    } catch (err) {
      console.log("Create Asset ERROR: ", err);
      reject(err);
    }
  });
};
