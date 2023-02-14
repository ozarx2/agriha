import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import CartContainer from "./CartContainer";

import styles from "./SuggestProductSingle.module.css";

const SuggestProductSingle = () => {
  const router = useRouter();

  const [projectId, setProjectId] = useState("");

  const [Store] = useContext(StoreContext);

  const setUserProjectViewNav = Store.setUserProjectViewNav;

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProjectId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  const backClick = () => {
    setUserProjectViewNav("product");
    router.back();
  };

  return (
    <div className={styles.projectContainer_outer}>
      <div className={styles.projectContainer_inner}>
        <div className={styles.container_header}>
          <div onClick={backClick} className={styles.backButton}>
            <img src="/img/project-details/back.svg" alt=".svg" />
            Back
          </div>
        </div>
        <div className={styles.container_body}>
          <div className={styles.container_body_left}>
            <div className={styles.container_left_cards}>
              <img
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60"
                alt=""
              />
            </div>
          </div>
          <div className={styles.container_body_center}>
            <div className={styles.center_container}>
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60"
                alt=""
              />
              <div className={styles.button_container_center}>
                <div className={styles.addToCart_button}>Add to cart</div>
                <div className={styles.findSimilar_button}>Find similar </div>
              </div>
            </div>
          </div>
          <div className={styles.container_body_right}>
            <div className={styles.product_details_container}>
              <p>
                The Sleep Company SmartGRID Stylux High-Back Chair for Office &
                Home|Patented SmartGRID Technology Nylon Office Executive Chair
                (Black, Grey, DIY(Do-It-Yourself))
              </p>
              <span>Pack of 1, Multicolor</span>
              <div className={styles.priceContainer}>
                <div className={styles.offerPrice}>₹3249</div>
                <div className={styles.originalPrice}>₹5,499</div>
                <div className={styles.offerPercentage}>76% off</div>
              </div>
              <div className={styles.product_specifications}>
                <div className={styles.product_specs_container}>
                  <div className={styles.row_productSpec}>
                    <div className={styles.left_row_productSpec}>
                      Product Dimensions
                    </div>
                    <div className={styles.right_row_productSpec}>
                      45.7D x 45.7W x 111.8H cm
                    </div>
                  </div>
                  <div className={styles.row_productSpec}>
                    <div className={styles.left_row_productSpec}>Colour</div>
                    <div className={styles.right_row_productSpec}>Brown</div>
                  </div>
                  <div className={styles.row_productSpec}>
                    <div className={styles.left_row_productSpec}>
                      Frame Material
                    </div>
                    <div className={styles.right_row_productSpec}>Wood</div>
                  </div>
                  <div className={styles.row_productSpec}>
                    <div className={styles.left_row_productSpec}>Brand</div>
                    <div className={styles.right_row_productSpec}>
                      G Fine Furniture
                    </div>
                  </div>
                  <div className={styles.row_productSpec}>
                    <div className={styles.left_row_productSpec}>Style</div>
                    <div className={styles.right_row_productSpec}>
                      traditional
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestProductSingle;
