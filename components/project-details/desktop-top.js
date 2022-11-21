import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./main.module.css";

export default function AgrihaProjectDetailsMainDesktopTop() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div id="AgrihaProjectDetail_desktop_section_outer" className={styles.desktop_section_outer}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.sone_inner}>
              <div className={styles.search}>
                <img src="/img/landing/search.svg" alt="search" />
                <input type="text" placeholder="Search Favorite Design" />
              </div>
              <div className={styles.filters}>
                <img src="/img/landing/filter.svg" alt="filter" />
                <span>All filters</span>
              </div>
              <div className={styles.sort}>
                <img src="/img/landing/sort.svg" alt="sort" />
                <span>Sort list</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.stwo_outer}>
          <div className={`container ${styles.container} ${styles.stwo}`}>
            <div className={styles.stwo_inner}>
              <div className={styles.left}>
                <Link href="/landing">
                  <div className={styles.back}>
                    <img src="/img/project-details/back.svg" alt="back" />
                  </div>
                </Link>
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
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className={styles.right}>
                <div className={styles.title}>Ahmedabad home where air, light and space play a starring role</div>
                <div className={styles.content}>
                  Abundant and bright, this apartment in Ahmedabad designed by Green Squares Design Studio is everything
                  you'd imagine a happy home to be
                </div>
                <div className={styles.profile}>
                  <img src="/img/landing/profile_img.svg" alt="profile" />
                  <span>Althaf Rahman</span>
                </div>
                <div className={styles.buttons}>
                  <div className={styles.send}>Send requirment</div>
                  <div className={styles.bid}>Bid</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sthree_outer}>
          <div className={`container ${styles.container} ${styles.sthree}`}>
            <div className={styles.sthree_inner}>
              <div className={styles.slider_outer}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={38.74}
                  slidesPerView={4.2}
                  freeMode={true}
                  // navigation={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.border_dsthree_dsfour}></div>
        <div className={styles.dsfour_outer}>
          <div className={`container ${styles.container} ${styles.dsfour}`}>
            <div className={styles.dsfour_inner}>
              <div className={styles.heading}>Similar items</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
