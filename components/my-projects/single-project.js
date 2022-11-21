/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./single-project.module.css";

export default function SingleProjectPopup({ setSingle }) {
  return (
    <>
      <div className={styles.SingleProjectPopupOuter}>
        <div className={styles.SingleProjectPopupInner}>
          <div onClick={() => setSingle(false)} className={styles.close}>
            <img src="/img/architect-dashboard/close.svg" alt="alt" />
            <span>Close</span>
          </div>
          <div
            className={`SingleProjectPopupSlider ${styles.SingleProjectPopupSlider} ${styles.special}`}
          >
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div>
                  <img src="/img/architect-dashboard/project/1.png" alt="alt" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <img src="/img/architect-dashboard/home.jpg" alt="alt" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.content}>
            <div className={styles.detail_outer}>
              <div className={styles.details}>
                <div className={styles.left}>
                  <div>Mr. Shamshad and Family Residence</div>
                  <div>Malappuram, kerala, india</div>
                </div>
                <div className={styles.right}>
                  <div>
                    2600 <span>sqft</span>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/project-files" passHref>
              <div className={styles.files}>
                <img
                  src="/img/architect-dashboard/folder-yellow.svg"
                  alt="alt"
                />
                <span>Project files</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
