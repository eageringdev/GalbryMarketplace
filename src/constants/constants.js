const defaultUserInfo = {
  userName: "Unnamed",
  bio: "",
  avatar: "default",
};

const defaultAvatarPath = window.origin + "/profile/default_avatar.png";

const walletOptions = [
  {
    label: "Metamask",
    value: "metamask",
    iconPath: window.origin + "/wallets/metamask.svg",
  },
  {
    label: "OKX Wallet",
    value: "okx",
    iconPath: window.origin + "/wallets/okx.svg",
  },
];

export default {
  defaultUserInfo,
  walletOptions,
  defaultAvatarPath,
};
