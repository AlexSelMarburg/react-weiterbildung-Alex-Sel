export const getShortenedString = (str, maxLength, ellipsis = "...") => {
  if (!str) return "";

  if (str.length > maxLength) {
    return str.slice(0, maxLength) + ellipsis;
  }

  return str;
};

export function getLocalStorage(key) {
  try {
    const basket = JSON.parse(localStorage.getItem(key));

    return Array.isArray(basket) ? basket : [];
  } catch (error) {
    console.log(error);
  }
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
