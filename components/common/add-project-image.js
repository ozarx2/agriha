/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./add-project-image.module.css";

const AddProjectImage = () => {
  const [Store] = useContext(StoreContext);

  const setAddProjectImagePopup = Store.setAddProjectImagePopup;
  const files = Store.files;
  const setFiles = Store.setFiles;

  let deleteBtnActiveData = [...files];
  const deleteBtnActiveTemp = deleteBtnActiveData.filter((res) => res.selected);
  const selectAllBtnActiveTemp = deleteBtnActiveData.filter((res) => !res.selected);
  const selectDeleteImages = (i) => {
    let temp = [...files];
    if (temp[i].selected == undefined) {
      temp[i].selected = true;
    } else if (temp[i].selected == false) {
      temp[i].selected = true;
    } else if (temp[i].selected == true) {
      temp[i].selected = false;
    }
    setFiles(temp);
  };
  const allSelectDeleteImages = (state) => {
    let temp = [...files];
    let length = files.length;
    for (let i = 0; i < length; i++) {
      temp[i].selected = state;
      setFiles(temp);
    }
  };
  const allDeleteImages = () => {
    let data = [...files];
    const temp = data.filter((res) => !res.selected);
    setFiles(temp);
  };
  const singleDeleteImage = (i) => {
    let temp = [...files];
    temp.splice(i, 1);
    setFiles(temp);
  };

  console.log("files", files);

  return (
    <>
      <div className={styles.AddProjectImageOuter}>
        <div onClick={() => setAddProjectImagePopup(false)} className={styles.AddProjectImageClose}></div>
        <div className={styles.AddProjectImageInner}>
          <div className={styles.heading}>
            <div className={styles.left}>
              <div onClick={() => setAddProjectImagePopup(false)} className={styles.back}>
                <img src="/img/architect-dashboard/back.svg" alt="back" />
                <span>Back</span>
              </div>
            </div>
            <div className={styles.right}>
              {selectAllBtnActiveTemp.length == 0 ? (
                <div onClick={() => allSelectDeleteImages(false)} className={styles.all}>
                  Unselect All
                </div>
              ) : (
                <div onClick={() => allSelectDeleteImages(true)} className={styles.all}>
                  All Select
                </div>
              )}
              {deleteBtnActiveTemp.length == 0 ? (
                <div className={styles.delete}>Delete</div>
              ) : (
                <div onClick={() => allDeleteImages()} className={styles.delete_active}>
                  Delete
                </div>
              )}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.content_image_outer}>
              {files.map((item, index) => {
                return (
                  <div key={index} className={styles.content_image_single_outer}>
                    {item.selected ? (
                      <>
                        <img
                          className={styles.imgDemo}
                          src={item.url}
                          onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                        />
                        <div className={`${styles.imgSelect} ${styles.active}`}>
                          <div className={styles.imgHoverDelete}>
                            <img
                              className={styles.delete_nh}
                              src="/img/architect-dashboard/delete-nh.svg"
                              alt="delete-nh"
                            />
                            <img
                              className={styles.delete_h}
                              onClick={() => singleDeleteImage(index)}
                              src="/img/architect-dashboard/delete-h.svg"
                              alt="delete-h"
                            />
                          </div>
                          <div className={styles.imgHoverSelect}>
                            <img
                              className={styles.select_h}
                              onClick={() => selectDeleteImages(index)}
                              src="/img/architect-dashboard/p-c.svg"
                              alt="select-h"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          className={styles.imgDemo}
                          src={item.url}
                          onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                        />
                        <div className={styles.imgHover}>
                          <div className={styles.imgHoverDelete}>
                            <img
                              className={styles.delete_nh}
                              src="/img/architect-dashboard/delete-nh.svg"
                              alt="delete-nh"
                            />
                            <img
                              className={styles.delete_h}
                              onClick={() => singleDeleteImage(index)}
                              src="/img/architect-dashboard/delete-h.svg"
                              alt="delete-h"
                            />
                          </div>
                          <div className={styles.imgHoverSelect}>
                            <img
                              className={styles.select_nh}
                              src="/img/architect-dashboard/select-nh.svg"
                              alt="select-nh"
                            />
                            <img
                              className={styles.select_h}
                              onClick={() => selectDeleteImages(index)}
                              src="/img/architect-dashboard/select-h.svg"
                              alt="select-h"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectImage;
