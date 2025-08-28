const KEY = "korelee_cart_v1";
export const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
};
export const saveCart = (cart) => {
  try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {}
};
