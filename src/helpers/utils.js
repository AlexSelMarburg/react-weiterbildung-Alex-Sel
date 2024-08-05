export const getShortenedString = (str, maxLength, ellipsis = "...") => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + ellipsis;
  }

  return str;
};
