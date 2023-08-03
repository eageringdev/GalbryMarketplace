import { ethers, utils } from "ethers";

// import utils
import { sendTransaction } from "./transaction";

// import engine constants
import { engine } from "../../constants";

// import abis
import marketplaceAbi from "../../contracts/marketplaceContractAbi.json";

export const createMarketItem = ({
  walletAddress,
  nftContractAddress,
  tokenId,
  price,
}) => {
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
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const txn =
        await marketplaceContract.populateTransaction.createMarketItem(
          nftContractAddress,
          tokenId,
          price
        );
      console.log("createMarketItem: ", txn);
      const txnRes = await sendTransaction({
        ...txn,
        from: window.ethereum.selectedAddress,
      });
      resolve(txnRes);
    } catch (err) {
      console.log("createMarketItem ERROR: ", err);
      reject(err);
    }
  });
};

export const cancelMarketItem = ({
  walletAddress,
  nftContractAddress,
  marketItemId,
}) => {
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
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const txn =
        await marketplaceContract.populateTransaction.cancelMarketItem(
          nftContractAddress,
          marketItemId
        );
      console.log("cancelMarketItem: ", txn);
      const txnRes = await sendTransaction({
        ...txn,
        from: window.ethereum.selectedAddress,
      });
      resolve(txnRes);
    } catch (err) {
      console.log("cancelMarketItem ERROR: ", err);
      reject(err);
    }
  });
};

export const buyMarketItem = ({
  walletAddress,
  nftContractAddress,
  marketItemId,
  price,
}) => {
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
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const txn =
        await marketplaceContract.populateTransaction.createMarketSale(
          nftContractAddress,
          marketItemId
        );
      console.log("buyMarketItem: ", txn);
      const txnRes = await sendTransaction({
        ...txn,
        from: window.ethereum.selectedAddress,
        value: price.toHexString(),
      });
      resolve(txnRes);
    } catch (err) {
      console.log("buyMarketItem ERROR: ", err);
      reject(err);
    }
  });
};

export const getMarketItemsCustom = (from, count) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const res = await marketplaceContract.fetchMarketItemsCustom(from, count);
      resolve({
        totalCount: res[0],
        fromIndex: res[1],
        marketItems: res[2],
      });
    } catch (err) {
      console.log("getMarketItemsCustom ERROR: ", err);
      reject(err);
    }
  });
};

export const getAvailableMarketItemsCustom = (from, count) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const res = await marketplaceContract.fetchAvailableMarketItemsCustom(
        from,
        count
      );
      resolve({
        totalCount: res[0],
        fromIndex: res[1],
        marketItems: res[2],
      });
    } catch (err) {
      console.log("getAvailableMarketItemsCustom ERROR: ", err);
      reject(err);
    }
  });
};

export const getMarketItemById = (marketItemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      const marketplaceContract = new ethers.Contract(
        engine.marketplaceContractAddress,
        marketplaceAbi,
        provider
      );
      const res = await marketplaceContract.fetchMarketItemById(marketItemId);
      resolve(res);
    } catch (err) {
      console.log("getMarketItemById ERROR: ", err);
      reject(err);
    }
  });
};
