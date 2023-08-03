import { ethers } from "ethers";

// import utils
import axios from "axios";
import { sendTransaction } from "./transaction";

// import engine constants
import { engine } from "../../constants";

// import abis
import nftContractAbi from "../../contracts/nftContractAbi.json";
import marketplaceAbi from "../../contracts/marketplaceContractAbi.json";

export const mintNFT = ({ walletAddress, tokenURI }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (walletAddress.toString() !== window.ethereum.selectedAddress) {
        reject({
          message: "Select Metamask account correctly.",
        });
        return;
      }
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const nftContract = new ethers.Contract(
        engine.nftContractAddress,
        nftContractAbi,
        provider
      );
      const txn = await nftContract.populateTransaction.mintToken(tokenURI);
      console.log("mintNFT: ", txn);
      const txnRes = await sendTransaction({
        ...txn,
        from: window.ethereum.selectedAddress,
      });
      resolve(txnRes);
    } catch (err) {
      console.log("mint NFT ERROR: ", err);
      reject(err);
    }
  });
};

export const getMetadata = ({
  nftContractAddress,
  tokenId,
  cachedMetadata = [],
  addMetadataToCacheAction = () => {},
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foundIndex = cachedMetadata.findIndex(
        (e) => e.tokenId.toString() == tokenId.toString()
      );
      if (foundIndex >= 0) {
        resolve(cachedMetadata[foundIndex].metadata);
        return;
      }
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const nftContract = new ethers.Contract(
        nftContractAddress,
        nftContractAbi,
        provider
      );
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const tokenURI = await nftContract.tokenURI(tokenId);
      const marketItemRes =
        await marketplaceContract.getLatestMarketItemByTokenId(tokenId);
      const metadata = await axios.get(tokenURI);
      const updatedMetadata = {
        ...metadata.data,
        marketItemId: marketItemRes[0].marketItemId.toNumber(),
      };
      resolve(updatedMetadata);
      addMetadataToCacheAction({
        tokenId: tokenId.toString(),
        metadata: updatedMetadata,
      });
    } catch (err) {
      console.log("Get Metadata ERROR: ", err);
      reject(err);
    }
  });
};

export const getCreatedAssets = ({ walletAddress }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const nftContract = new ethers.Contract(
        engine.nftContractAddress,
        nftContractAbi,
        provider
      );
      const res = await nftContract.getTokensCreatedByMe({
        from: walletAddress,
      });
      resolve(res);
    } catch (err) {
      console.log("getCreatedAssets ERROR: ", err);
      reject(err);
    }
  });
};

export const getMyAssets = ({ walletAddress }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const nftContract = new ethers.Contract(
        engine.nftContractAddress,
        nftContractAbi,
        provider
      );
      const res = await nftContract.getTokensOwnedByMe({ from: walletAddress });
      resolve(res);
    } catch (err) {
      console.log("getMyAssets ERROR: ", err);
      reject(err);
    }
  });
};
