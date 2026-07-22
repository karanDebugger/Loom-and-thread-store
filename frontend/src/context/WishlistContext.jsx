import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const data = await getWishlist();
      setWishlist(data.wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (productId) => {
    const data = await addToWishlist(productId);
    setWishlist(data.wishlist);
  };

  const removeItem = async (productId) => {
    const data = await removeFromWishlist(productId);
    setWishlist(data.wishlist);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addItem,
        removeItem,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlistContext = () =>
  useContext(WishlistContext);