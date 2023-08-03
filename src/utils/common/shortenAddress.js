const shortenAddress = (adderss, startCount = 4, endCount = 4) => {
  if (!adderss) return "";
  return adderss.slice(0, startCount) + "..." + adderss.slice(-endCount);
};

export default shortenAddress;
