import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./CartPopUp.module.css";

const CartPopUp = () => {
  const [Store] = useContext(StoreContext);
  const setCartOpen = Store.setCartOpen;

  return (
    <div className={styles.cartPopup_outer}>
      <div
        className={styles.cartPopup_close}
        onClick={() => setCartOpen(false)}
      ></div>
      <div className={styles.cartPopup_inner}>
        <div className={styles.cartPopup_container}>
          <div className={styles.left_cart}>
            <div className={styles.cart_header_left}>
              <h5>Selection cart</h5>
              <span>08 items</span>
            </div>
            <div className={styles.cart_cards_container}>
              <div className={styles.cart_card}>
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                  alt=""
                />
                <div className={styles.product_details_card}>
                  <p>
                    The Sleep Company Smart GRID Stylus High-Back Chair for
                    Office & Overparented Smart GRID Technology Nylon Office
                    Executive Chair.
                  </p>
                  <span>Pack of 1, Multicolor</span>
                  <div className={styles.priceContainer}>
                    <div className={styles.offerPrice}>₹3249</div>
                    <div className={styles.originalPrice}>₹5,499</div>
                    <div className={styles.offerPercentage}>76% off</div>
                  </div>
                  <div className={styles.stock_status}>Stock in</div>
                </div>
              </div>

              <div className={styles.cart_card}>
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                  alt=""
                />
                <div className={styles.product_details_card}>
                  <p>
                    The Sleep Company Smart GRID Stylus High-Back Chair for
                    Office & Overparented Smart GRID Technology Nylon Office
                    Executive Chair.
                  </p>
                  <span>Pack of 1, Multicolor</span>
                  <div className={styles.priceContainer}>
                    <div className={styles.offerPrice}>₹3249</div>
                    <div className={styles.originalPrice}>₹5,499</div>
                    <div className={styles.offerPercentage}>76% off</div>
                  </div>
                  <div className={styles.stock_status}>Stock in</div>
                </div>
              </div>
              <div className={styles.cart_card}>
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                  alt=""
                />
                <div className={styles.product_details_card}>
                  <p>
                    The Sleep Company Smart GRID Stylus High-Back Chair for
                    Office & Overparented Smart GRID Technology Nylon Office
                    Executive Chair.
                  </p>
                  <span>Pack of 1, Multicolor</span>
                  <div className={styles.priceContainer}>
                    <div className={styles.offerPrice}>₹3249</div>
                    <div className={styles.originalPrice}>₹5,499</div>
                    <div className={styles.offerPercentage}>76% off</div>
                  </div>
                  <div className={styles.stock_status}>Stock in</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right_cart}>
            <div className={styles.cart_header_right}>
              <h5>Price details</h5>
              <span>i</span>
            </div>
            <div className={styles.priceContainer_right}>
              <div className={styles.row_priceContainer_right}>
                <p>Price ( 03 items ) : </p>
                <h5>₹33,249.00</h5>
              </div>
              <div className={styles.row_priceContainer_right}>
                <p>Discount : </p>
                <span className={styles.greenText}>₹1,249.00</span>
              </div>
              <div className={styles.row_priceContainer_right}>
                <p>Delivery charge : </p>
                <span className={styles.greenText}>Free</span>
              </div>
            </div>
            <div className={styles.subtotal_container}>
              <p>Subtotal (02 items)</p>
              <span>₹3,249.00</span>
            </div>
            <div className={styles.confirm_button}>Confirm</div>
            <div className={styles.location_top}>
              <div className={styles.location_top_left}>
                <img src="/img/user-my-project/location.svg" alt="" />
                <h5>Delivery address</h5>
              </div>
              <div className={styles.editButton}>Edit</div>
            </div>
            <div className={styles.location_bottom}>
              <input type="checkbox" />
              <p>Great South Road, Manukau, Saules ilea 7 - 16, Cosi</p>
            </div>
            <div className={styles.delivery_address_button}>
              Delivery address +
            </div>
            <div className={styles.terms}>
              <img src="/img/user-my-project/secure.svg" />
              <p>Safe and Secure Payments.100% Authentic products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopUp;
