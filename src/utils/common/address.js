import { ethers, utils } from "ethers";

const addressCompare = (address1, address2) => {
  return (
    address1 &&
    address2 &&
    utils.isAddress(address1.toString()) &&
    utils.isAddress(address2.toString()) &&
    address1.toString().toLowerCase() === address2.toString().toLowerCase()
  );
};

const isZeroAddress = (address) => {
  return ethers.constants.AddressZero === address;
};

export { addressCompare, isZeroAddress };
