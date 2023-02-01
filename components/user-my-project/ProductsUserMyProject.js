import React, { useEffect, useState } from "react";
import styles from "./ProductsUserMyProject.module.css";

const ProductsUserMyProject = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const response = await fetch(`https://ecommnerc-test.onrender.com/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={styles.products_container_top}>
        <p>Bedroom items</p>
      </div>
      <div className={styles.project_cards_container}>
        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>

        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>

        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>

        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>

        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>

        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>

        <div className={styles.products_card}>
          <img src="/img/user-my-project/no-image.png" />
          <h4>Amrange 210 TC Cotton King 3D Printed Fitted (Elastic) ...</h4>
          <p>Pack of 1, Multicolor</p>
          <div className={styles.priceContainer}>
            <div className={styles.offerPrice}>₹3249</div>
            <div className={styles.originalPrice}>₹5,499</div>
            <div className={styles.offerPercentage}>76% off</div>
          </div>
          <div className={styles.selectButton}>Select</div>
        </div>
      </div>
    </>
  );
};

export default ProductsUserMyProject;
