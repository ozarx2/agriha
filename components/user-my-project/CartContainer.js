import React, { useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./CartContainer.module.css";

const CartContainer = () => {
  const [Store] = useContext(StoreContext);
  const setCartOpen = Store.setCartOpen;

  const cartClick = () => {
    setCartOpen(true);
  };

  return (
    <div className={styles.cartContainer_outer}>
      <div className={styles.cartContainer}>
        <div className={styles.cartIcon_container} onClick={cartClick}>
          <img src="/img/user-my-project/cartIcon.svg" />
          <span>3</span>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
