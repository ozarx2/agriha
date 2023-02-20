import { useRouter } from "next/router";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import styles from "./ProductsUserMyProject.module.css";

const SuggestProjectCard = ({ product }) => {
  const router = useRouter();

  const [Store] = useContext(StoreContext);
  const setRefreshUser = Store.setRefreshUser;
  const refreshUser = Store.refreshUser;

  async function selectProduct(productId) {
    const response = await fetch(`${api_url}/projects/select_products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      console.log("success");
      setRefreshUser(!refreshUser);
    }
  }

  const gotoProductView = (id) => {
    router.push(`/suggested-product/${id}`);
  };

  return (
    <div className={styles.products_card}>
      <div className={styles.products_card_top} onClick={() => gotoProductView(product.productId._id)}>
        <img src={product.productId.thumbnail ? product.productId.thumbnail : "/img/user-my-project/no-image.png"} />
        <div className={styles.products_card_content}>
          <h4>{product.productId.name}</h4>
          <p>{product.productId.description}</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>
              ₹{product.productId.mrp - (product.productId.mrp * product.productId.discount_rate) / 100}
            </div>
            <div className={styles.originalPrice}>₹{product.productId.mrp}</div>
            <div className={styles.offerPercentage}>{product.productId.discount_rate}% off</div>
          </div>
        </div>
      </div>
      {product.select ? (
        <div className={styles.selectedButton}>Selected</div>
      ) : (
        <div className={styles.selectButton} onClick={() => selectProduct(product._id)}>
          Select
        </div>
      )}
    </div>
  );
};

export default SuggestProjectCard;
