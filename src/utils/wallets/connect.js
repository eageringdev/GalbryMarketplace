const metamaskConnect = ({ setCurrentWalletInfoAction }) => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      try {
        const accountsRes = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Return the address of the wallet
        window.localStorage.setItem(
          "current_wallet",
          JSON.stringify({ address: accountsRes[0], type: "metamask" })
        );
        setCurrentWalletInfoAction({
          address: accountsRes[0],
          type: "metmask",
        });
        window.ethereum.on("accountsChanged", (accounts) => {
          window.localStorage.setItem(
            "current_wallet",
            JSON.stringify({ address: accounts[0], type: "metamask" })
          );
          setCurrentWalletInfoAction({
            address: accounts[0],
            type: "metmask",
          });
        });
        resolve({
          address: accountsRes[0],
          type: "metmask",
        });
      } catch (err) {
        reject(err);
      }
    } else {
      window.open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
        "_blank"
      );
      reject({ message: "Install Metamask" });
    }
  });
};

export { metamaskConnect };
