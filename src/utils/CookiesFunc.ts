import Cookies from "js-cookie";

// Function to store a token in a cookie
export const SetItemToCookie = (
  key: string,
  value: string,
  expires?: number
) => {
  Cookies.set(key, value, {
    expires: expires || 1,
  });
};

// Function to retrieve a token from the cookie
export const GetItemFromCookie = (key: string) => {
  return Cookies.get(key) || null;
};

// Function to remove the token cookie
export const RemoveItemFromCookie = (key: string) => {
  Cookies.remove(key);
};
