/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import { useState } from "react";

import styles from "./suggested.module.css";

const FnSuggested = ({ suggestion }) => {
  const [hall, setHall] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [bed, setBed] = useState(false);
  const [hallProd, setHallProd] = useState("");
  const [kitchenProd, setKitchenProd] = useState("");
  const [bedProd, setBedProd] = useState("");
  const [viewAllProd, setViewAllProd] = useState("");

  const toggleHall = () => {
    setHall((prevState) => !prevState);
    setHallProd();
  };
  const toggleBed = () => {
    setBed((prevState) => !prevState);
    setBedProd();
  };
  const toggleKitchen = () => {
    setKitchen((prevState) => !prevState);
    setKitchenProd();
  };

  const Furniture = suggestion.filter((res) => res.category_id?.category_name === "Furniture");

  return (
    <>
      <div className={styles.suggestedMain}>
        <div className={styles.suggestedHead}>
          <div className={styles.suggestedTitle}>Suggested Products</div>
          {/* <div className={styles.suggestedViewall}>
            <div>
              <div>View all</div>
              <img src="/img/my-project-user/viewallright.svg" alt="viewall" />
            </div>
          </div> */}
        </div>

        <div className={styles.suggProdSecMain}>
          <div className={styles.suggProdSec}>
            <span>0{suggestion?.length}</span>
            <div onClick={() => toggleHall()}>hall-product</div>
            {hall ? (
              <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" onClick={() => toggleHall()} />
            ) : (
              <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" onClick={() => toggleHall()} />
            )}
          </div>
          {hall ? (
            <div className={styles.suggestedProListMain}>
              {suggestion?.map((items, index) => {
                return (
                  <div key={index} className={styles.suggProList}>
                    <img src={items.thumbnail} alt="thumbnail" />
                    <div className={styles.suggProDetailes}>
                      <div>
                        <div className={styles.prodName}>{items.name}</div>
                        <div className={styles.prodDate}>{moment(items.updatedAt).format("MMM Do YY")}</div>
                      </div>
                      <div className={styles.prodRate}>₹ {items.mrp}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div>
            <div className={styles.suggProdSec}>
              <span>0{Furniture?.length}</span>
              <div onClick={() => toggleBed()}>bedroom-product</div>
              {bed ? (
                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" onClick={() => toggleBed()} />
              ) : (
                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" onClick={() => toggleBed()} />
              )}
            </div>
            {bed ? (
              // {bed && suggestion?.category_id?.category_name === "Furniture" ? (
              <div className={styles.suggestedProListMain}>
                {Furniture?.map((items, index) => {
                  return (
                    <div key={index} className={styles.suggProList}>
                      <img src={items.thumbnail} alt="thumbnail" />
                      <div className={styles.suggProDetailes}>
                        <div>
                          <div className={styles.prodName}>{items.name}</div>
                          <div className={styles.prodDate}>{moment(items.updatedAt).format("MMM Do YY")}</div>
                        </div>
                        <div className={styles.prodRate}>₹ {items.mrp}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <div className={styles.suggProdSec}>
              <span>01</span>
              <div onClick={() => toggleKitchen()}> kitchen-product</div>
              {kitchen ? (
                <img src="/img/my-project-user/mobile/upmob.svg" alt="upmob.svg" onClick={() => toggleKitchen()} />
              ) : (
                <img src="/img/my-project-user/mobile/downmob.svg" alt="downmob.svg" onClick={() => toggleKitchen()} />
              )}
            </div>
            {kitchen ? (
              <div className={styles.suggestedProListMain}>
                {Array.apply(null, { length: 1 }).map((e, i) => (
                  <div className={styles.suggProList}>
                    <img src="/img/my-project-user/washbase.svg" alt="" />
                    <div className={styles.suggProDetailes}>
                      <div>
                        <div className={styles.prodName}>Wash Base</div>
                        <div className={styles.prodDate}>feb 4th 22</div>
                      </div>
                      <div className={styles.prodRate}>₹ 4999.00</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FnSuggested;
