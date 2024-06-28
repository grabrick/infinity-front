import Cookies from "js-cookie";

export const getStoreLocal = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const ls = Cookies.get(name)
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};