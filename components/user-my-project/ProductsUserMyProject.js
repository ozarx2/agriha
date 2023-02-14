import React, { useEffect, useState } from "react";
import styles from "./ProductsUserMyProject.module.css";

const ProductsUserMyProject = () => {
  const [products, setProducts] = useState([]);
  const [stage, setStage] = useState("two");

  async function getProducts() {
    const response = await fetch(
      `https://ecommnerc-test.onrender.com/product`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={styles.products_container_stage}>
        {stage === "one" ? (
          <div className={styles.stageContainerActive}>
            <div>
              Stage 1 <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div
            className={styles.stageContainer}
            onClick={() => setStage("one")}
          >
            <div>Stage 1</div>
            <img src="/img/user-my-project/arrowborder.svg" alt="" />
          </div>
        )}
        {stage === "two" ? (
          <div className={styles.stageContainerActiveTow}>
            <img src="/img/user-my-project/leftBorder.png" alt="" />
            <div>
              Stage 2 <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div
            className={styles.stageContainer}
            onClick={() => setStage("two")}
          >
            <div>Stage 2</div>
            <img src="/img/user-my-project/arrowborder.svg" alt="" />
          </div>
        )}
        {stage === "three" ? (
          <div className={styles.stageContainerActiveTow}>
            <img src="/img/user-my-project/leftBorder.png" alt="" />
            <div>
              Stage 3 <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div
            className={styles.stageContainer}
            onClick={() => setStage("three")}
          >
            <div>Stage 3</div>
          </div>
        )}
      </div>
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
