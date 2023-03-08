import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import CartContainer from "./CartContainer";

import styles from "./SuggestProductSingle.module.css";

const SuggestProductSingle = () => {
  const router = useRouter();

  const [Store] = useContext(StoreContext);
  const setUserProjectViewNav = Store.setUserProjectViewNav;

  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  /* GET PROJECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProductId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  const backClick = () => {
    setUserProjectViewNav("product");
    router.back();
  };

  async function getProduct() {
    const response = await fetch(`${api_url}/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      setProductDetails(data.productDta);
    }
  }

  useEffect(() => {
    if (productId !== "") {
      getProduct();
    }
  }, [productId]);

  return (
    <div className={styles.projectContainer_outer}>
      <div className={styles.projectContainer_inner}>
        <div className={styles.container_header}>
          <div onClick={backClick} className={styles.backButton}>
            <img src="/img/project-details/back.svg" alt=".svg" />
            Back
          </div>
        </div>
        {productDetails.length !== 0 ? (
          <div className={styles.container_body}>
            <div className={styles.container_body_left}>
              <div className={styles.container_left_cards}>
                {productDetails.image?.map((item, index) => {
                  return <img key={index} src={item} alt="" />;
                })}
              </div>
            </div>
            <div className={styles.container_body_center}>
              <div className={styles.center_container}>
                <img
                  src={productDetails?.thumbnail ? productDetails?.thumbnail : "/img/user-my-project/no-image.png"}
                  alt=""
                />
                {/* <div className={styles.button_container_center}>
                  <div className={styles.addToCart_button}>Add to cart</div>
                  <div className={styles.findSimilar_button}>Find similar </div>
                </div> */}
              </div>
            </div>
            <div className={styles.container_body_right}>
              <div className={styles.product_details_container}>
                <p>{productDetails?.name}</p>
                <span>{productDetails?.description}</span>
                <div className={styles.priceContainer}>
                  <div className={styles.offerPrice}>
                    ₹{productDetails?.mrp - (productDetails?.mrp * productDetails?.discount_rate) / 100}
                  </div>
                  <div className={styles.originalPrice}>₹{productDetails?.mrp}</div>
                  <div className={styles.offerPercentage}>{productDetails?.discount_rate}% off</div>
                </div>
                <div className={styles.product_specifications}>
                  <div className={styles.product_specs_container}>
                    <div className={styles.row_productSpec}>
                      <div className={styles.left_row_productSpec}>Product Dimensions</div>
                      <div className={styles.right_row_productSpec}>
                        {productDetails.length}D x {productDetails.weight}W x {productDetails.height}H cm
                      </div>
                    </div>
                    <div className={styles.row_productSpec}>
                      <div className={styles.left_row_productSpec}>Colour</div>
                      <div className={styles.right_row_productSpec}>
                        {productDetails?.color?.map((item, index) => {
                          return item;
                        })}
                      </div>
                    </div>
                    <div className={styles.row_productSpec}>
                      <div className={styles.left_row_productSpec}>Frame Material</div>
                      <div className={styles.right_row_productSpec}>{productDetails.material_type}</div>
                    </div>
                    <div className={styles.row_productSpec}>
                      <div className={styles.left_row_productSpec}>Brand</div>
                      <div className={styles.right_row_productSpec}>{productDetails.brand}</div>
                    </div>
                    <div className={styles.row_productSpec}>
                      <div className={styles.left_row_productSpec}>Style</div>
                      <div className={styles.right_row_productSpec}>{productDetails.model}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
};

export default SuggestProductSingle;
