import React, { useContext, useEffect, useState } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import styles from "./ProductsUserMyProject.module.css";
import SuggestProjectCard from "./SuggestProjectCard";

const ProductsUserMyProject = () => {
  const [Store] = useContext(StoreContext);
  const refreshUser = Store.refreshUser;

  const [products, setProducts] = useState([]);
  const [stage, setStage] = useState("one");

  const [projectId, setProjectId] = useState("63e0c4f75d7ebfc833af3f4d");

  const [filteredItem, setFilteredItem] = useState([]);

  // /* GET Project ID */
  // function getParameters() {
  //   let urlString = window.location.href;
  //   let paramString = urlString.split("/")[4];
  //   let queryString = new URLSearchParams(paramString);
  //   for (let pair of queryString.entries()) {
  //     setProjectId(pair[0]);
  //   }
  // }

  // useEffect(() => {
  //   getParameters();
  // }, []);

  useEffect(() => {
    if (products.length !== 0) {
      let structural = products.filter((item) => item.phase === "Structural works");
      let interior = products.filter((item) => item.phase === "Interior decorating");
      let exterior = products.filter((item) => item.phase === "Exterior decorating");
      let landscaping = products.filter((item) => item.phase === "Landscaping & Hardscaping");
      let security = products.filter((item) => item.phase === "Security & Automation");

      if (stage === "one") {
        setFilteredItem(structural);
        console.log(structural);
      } else if (stage === "two") {
        setFilteredItem(interior);
        console.log(interior);
      } else if (stage === "three") {
        setFilteredItem(exterior);
        console.log(exterior);
      } else if (stage === "four") {
        setFilteredItem(landscaping);
        console.log(landscaping);
      } else if (stage === "five") {
        setFilteredItem(security);
        console.log(security);
      }
    }
  }, [products, stage]);

  async function getProducts() {
    const response = await fetch(`${api_url}/projects/suggestedProducts/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    console.log(data);
    setProducts(data.data);
  }

  useEffect(() => {
    console.log("changed");
    if (projectId !== "") {
      getProducts();
    }
  }, [projectId, refreshUser]);

  return (
    <>
      <div className={styles.products_container_stage}>
        {stage === "one" ? (
          <div className={styles.stageContainerActive}>
            <div>
              Structural works <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div className={styles.stageContainer} onClick={() => setStage("one")}>
            <div>Structural works</div>
            <img src="/img/user-my-project/arrowborder.svg" alt="" />
          </div>
        )}
        {stage === "two" ? (
          <div className={styles.stageContainerActiveTow}>
            <img src="/img/user-my-project/leftBorder.png" alt="" />
            <div>
              Interior decorating <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div className={styles.stageContainer} onClick={() => setStage("two")}>
            <div>Interior decorating</div>
            <img src="/img/user-my-project/arrowborder.svg" alt="" />
          </div>
        )}
        {stage === "three" ? (
          <div className={styles.stageContainerActiveTow}>
            <img src="/img/user-my-project/leftBorder.png" alt="" />
            <div>
              Exterior decorating <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div className={styles.stageContainer} onClick={() => setStage("three")}>
            <div>Exterior decorating</div>
            <img src="/img/user-my-project/arrowborder.svg" alt="" />
          </div>
        )}
        {stage === "four" ? (
          <div className={styles.stageContainerActiveTow}>
            <img src="/img/user-my-project/leftBorder.png" alt="" />
            <div>
              Landscaping & Hardscaping <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div className={styles.stageContainer} onClick={() => setStage("four")}>
            <div>Landscaping & Hardscaping</div>
            <img src="/img/user-my-project/arrowborder.svg" alt="" />
          </div>
        )}
        {stage === "five" ? (
          <div className={styles.stageContainerActiveTow}>
            <img src="/img/user-my-project/leftBorder.png" alt="" />
            <div>
              Security & Automation <img src="/img/user-my-project/arrowDown.svg" alt="" />
            </div>
            <img src="/img/user-my-project/rightBorder.png" alt="" />
          </div>
        ) : (
          <div className={styles.stageContainer} onClick={() => setStage("five")}>
            <div>Security & Automation</div>
          </div>
        )}
      </div>

      {filteredItem.map((item) => {
        return (
          <>
            {stage === "one" || stage === "two" ? (
              <div className={styles.products_container_top}>
                <p>{item.facility_name}</p>
              </div>
            ) : (
              ""
            )}
            <div className={styles.project_cards_container}>
              {item?.products.map((product, index) => {
                return <SuggestProjectCard product={product} />;
              })}
            </div>
          </>
        );
      })}
    </>
  );
};

export default ProductsUserMyProject;
