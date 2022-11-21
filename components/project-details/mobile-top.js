/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./main.module.css";

export default function AgrihaProjectDetailsMainMobileTop() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div
        id="agriha_mobile_section_outer"
        className={styles.mobile_section_outer}
      >
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.sone_inner}>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                // navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    alt="'"
                  />
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3.2}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-5.jpg"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div className={styles.stwo_outer}>
          <div className={`container ${styles.container} ${styles.stwo}`}>
            <div className={styles.stwo_inner}>
              <div className="landing_stwo_inner">
                <div className={styles.stwo_max}>
                  <div className={styles.heading}>
                    Ahmedabad home where air, light and space play a starring
                    role
                  </div>
                  <div className={styles.content}>
                    Abundant and bright, this apartment in Ahmedabad designed by
                    Green Squares Design Studio is everything you would imagine
                    a happy home to be
                  </div>
                  <div className={styles.profile}>
                    <div className={styles.left}>
                      <img src="/img/landing/profile_img.svg" alt="profile" />
                      <span>Althaf Rahman</span>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.send}>Send requirment</div>
                      <div className={styles.bid}>Bid</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.border_mstwo_msthree}></div>
        <div className={styles.msthree_outer}>
          <div className={`container ${styles.container} ${styles.msthree}`}>
            <div className={styles.msthree_inner}>
              <div className={styles.heading}>Similar items</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
