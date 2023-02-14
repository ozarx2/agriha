import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";

import styles from "./single-main.module.css";

export default function SuggestProductSearch({ product, index, selectProduct, setSelectProduct }) {
  const [Store] = useContext(StoreContext);

  const productFound = selectProduct.filter((item) => item._id === product._id);
  const fnselectProduct = () => {
    if (productFound.length === 0) {
      setSelectProduct([...selectProduct, product]);
    } else {
      console.log("already added");
    }
  };
  const fnremoveProduct = () => {
    const arr = selectProduct.filter((item) => item !== product);
    setSelectProduct(arr);
  };

  return (
    <div className={styles.products_outer} key={index}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.product_name}>{product.name}</div>
          <div className={styles.product_category}>
            <span className={styles.product_categoryMain}>Category</span> <span>-</span>
            <span className={styles.product_subcategory}>Subcategory</span>
          </div>
        </div>
        <div className={styles.right}>
          {productFound.length === 0 ? (
            <div onClick={() => fnselectProduct()}>Select</div>
          ) : (
            <div onClick={() => fnremoveProduct()}>Remove</div>
          )}
        </div>
      </div>
      <img className={styles.image} src="/img/common/ni.jpg" alt="product" />
      <div className={styles.price}>
        <span className={styles.product_mrp}>MRP : ₹{product.mrp}/-</span>
        <span className={styles.product_discount}>Discount : {product.discount_rate}%</span>
      </div>
      <div className={styles.product_desc}>{product.description}</div>
      <div className={styles.product_adnl_details}>
        <span className={styles.product_sku}>
          <span className={styles.dim}>SKU :</span> {product.sku}
        </span>
        <span className={styles.product_code}>
          <span className={styles.dim}>Product Code :</span> {product.productCode}
        </span>
        <span className={styles.product_tag}>
          <span className={styles.dim}>Tag :</span> {product.tag}
        </span>
      </div>
      <div className={styles.product_adnl_stock_details}>
        <span className={styles.product_stock}>
          <span className={styles.dim}>Stock :</span> {product.stock_qty}
        </span>
        <span className={styles.product_weight}>
          <span className={styles.dim}>Weight :</span> {product.weight}Kg
        </span>
        <span className={styles.product_volume}>
          <span className={styles.dim}>Volume :</span> {product.volume}L
        </span>
      </div>
    </div>
  );
}
