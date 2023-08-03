const shortenString = (str, length) => {
  if (!str) return "...";
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, Math.max(length - 3, 0)) + "...";
};

export default shortenString;
