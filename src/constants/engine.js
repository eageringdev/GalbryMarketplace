const infuraApiKey = "9aa3d95b3bc440fa88ea12eaa4456161";

const MAINNET = "1";
const GOERLI = "5";
const BSCTESTNET = "97";

const networkList = {
  [MAINNET]: {
    name: "Ethereum Main Network",
    shortName: "Ethereum",
    networkId: 1,
    chainId: 1,
    hexChainId: "0x1",
    color: "#3cc29e",
    networkType: "mainnet",
    rpc: "https://mainnet.infura.io/v3/" + infuraApiKey,
    symbol: "ETH",
    chainType: "ethereum",
  },
  [GOERLI]: {
    name: "Goerli Test Network",
    shortName: "Goerli",
    networkId: 5,
    chainId: 5,
    hexChainId: "0x5",
    color: "#3099f2",
    networkType: "goerli",
    rpc: "https://goerli.infura.io/v3/" + infuraApiKey,
    symbol: "ETH",
    chainType: "ethereum",
  },
  [BSCTESTNET]: {
    name: "Binance Smart Chain Test Network",
    shortName: "BSC Test",
    networkId: 97,
    chainId: 97,
    hexChainId: "0x61",
    color: "#d6f344",
    networkType: "bsctestnet",
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    symbol: "BNB",
    chainType: "binance",
  },
};

const marketplaceContractAddress = "0xaDa82fA35072D601E991CE7e3a1b96eC92e16DAc";
const nftContractAddress = "0x5c0981Bd7BAD040DC473f08e5ad16CC7677CC115";

export default {
  infuraApiKey,
  MAINNET,
  BSCTESTNET,
  GOERLI,
  networkList,
  // contracts
  nftContractAddress,
  marketplaceContractAddress,
};
