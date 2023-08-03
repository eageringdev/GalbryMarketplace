import { ethers } from "ethers";

const metamaskSign = ({ message }) => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      try {
        console.log("metamask sign: ", { message });
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        const address = await signer.getAddress();
        resolve({
          message,
          signature,
          address,
        });
      } catch (err) {
        reject(err);
      }
    } else {
      console.log("Install Metamask!!!");
      reject({ message: "Install Metamask" });
    }
  });
};

export { metamaskSign };
