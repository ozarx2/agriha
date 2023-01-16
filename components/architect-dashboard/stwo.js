/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import { StoreContext } from "../../components/StoreContext";
import styles from "./stwo.module.css";
import Link from "next/link";

export default function FnSTwo() {
  const [Store] = useContext(StoreContext);

  const setAddProject = Store.setAddProject;
  const projects = Store.projects;

  return (
    <>
      <div className={styles.stwo_outer}>
        <div className={styles.stwo_inner}>
          <div className={styles.title}>
            <div>
              Own Projects
              <span className={styles.dot}>
                <Image src="/img/architect-dashboard/dot.svg" alt="dot" width={3} height={3} />
              </span>
              <span className={styles.number}>{projects?.length}</span>
            </div>
            <Link href="/my-projects" passHref>
              <div>View all</div>
            </Link>
          </div>
          {projects?.length !== 0 ? (
            <div className={`architect_dashboard ${styles.slider_outer}`}>
              <Swiper
                autoHeight={true}
                slidesPerView={3.75}
                spaceBetween={20}
                freeMode={true}
                pagination={{
                  clickable: false,
                }}
                breakpoints={{
                  300: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                  },
                  400: {
                    slidesPerView: 2.2,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 3.2,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 4.2,
                    spaceBetween: 20,
                  },
                  1700: {
                    slidesPerView: 6.2,
                    spaceBetween: 20,
                  },
                }}
                modules={[FreeMode, Pagination]}
                className="architect_project"
              >
                {projects
                  ?.slice(0)
                  .reverse()
                  ?.map((item, index) => {
                    {
                      /* console.log(item); */
                    }
                    return (
                      <SwiperSlide key={index}>
                        <Link href={`/my-projects/${item._id}`} passHref>
                          <div className={styles.slide_outer}>
                            <div className={styles.slide_image}>
                              <img
                                src={
                                  item?.thumbnail
                                    ? item?.thumbnail
                                    : item?.Image[0]
                                    ? item?.Image[0]
                                    : "/img/architect-dashboard/noImg.jpeg"
                                }
                                onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                                alt="alt"
                              />
                            </div>
                            <div className={styles.slide_title}>
                              <h3>{item?.projectname}</h3>
                              <p>
                                <span>{item?.location}</span> | <span>{item?.projectarea}</span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          ) : (
            <div className={styles.no_project}>
              <div className={styles.no_project_image}>
                <Image src="/img/architect-dashboard/no.svg" alt="no_project_image" width={115} height={85} />
              </div>
              <h3>Look like there is no projects is here</h3>
              <h5>Now field is blank, so please create your project is here</h5>
              <button onClick={() => setAddProject(true)}>Create now</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
