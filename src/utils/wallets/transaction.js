import { ethers } from "ethers";

// import engine constants
import { engine } from "../../constants";

export const sendTransaction = (txn) => {
  if (!window.ethereum) {
    alert("Metamask is not found.");
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
      "_blank"
    );
    return;
  }
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum.networkVersion != "5") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      }
      const txnHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{ ...txn }],
      });
      const provider = new ethers.providers.JsonRpcProvider(
        engine.networkList[engine.GOERLI].rpc
      );
      provider.once(txnHash, (transaction) => {
        resolve(transaction);
      });
    } catch (err) {
      console.log("sendTransaction ERROR: ", err);
      reject(err);
    }
  });
};
