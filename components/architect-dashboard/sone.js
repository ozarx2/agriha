/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import Image from "next/image";
import Link from "next/link";

import styles from "./sone.module.css";

export default function FnSOne() {
  const [Store] = useContext(StoreContext);

  const setAddProject = Store.setAddProject;
  const architectData = Store.architectData;
  const allProjects = Store.projects;
  const assignedProjects = Store.userProjects;
  const setArcDashQueue = Store.setArcDashQueue;

  const queue = assignedProjects?.filter((res) => res.status === "started");
  const ongoing = assignedProjects?.filter((res) => res.status === "ongoing");

  const router = useRouter();

  const queueClick = () => {
    setArcDashQueue(true);
    router.push("/ongoing-project");
  };

  return (
    <>
      <div className={styles.sone_outer}>
        <div className={styles.sone_inner}>
          <div className={styles.left}>
            <div className={styles.profile_image}>
              <img
                src={architectData?.profilepic ? architectData?.profilepic : "/img/architect-dashboard/profile_img.svg"}
                onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                alt="profile-image"
              />
              <Link href="/dashboard-settings" passHref>
                <div className={styles.edit}>
                  <img src="/img/architect-dashboard/edit.svg" alt="edit" />
                </div>
              </Link>
            </div>
            <div className={styles.content}>
              <h3>
                {architectData?.registered_id
                  ? architectData?.registered_id?.name
                  : architectData?.firstname + " " + architectData?.lastname}
              </h3>
              <h4>Architect</h4>
              <h6>
                <span className={styles.location}>
                  <Image src="/img/architect-dashboard/location.svg" alt="location" width={12.23} height={11.11} />
                </span>
                {architectData?.location}
              </h6>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.right}>
            <div className={styles.project_outer}>
              <Link href="/my-projects" passHref>
                <div className={`${styles.project} ${styles.pone}`}>
                  <div className={styles.img}>
                    <Image
                      src="/img/architect-dashboard/total_project.svg"
                      alt="total_project"
                      width={76}
                      height={76}
                    />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.title}>Projects</div>
                    <div className={styles.count}>{allProjects?.length}</div>
                  </div>
                </div>
              </Link>
              <Link href="/ongoing-project" passHref>
                <div className={`${styles.project} ${styles.ptwo}`}>
                  <div className={styles.img}>
                    <Image src="/img/architect-dashboard/ongoing.svg" alt="ongoing" width={76} height={76} />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.title}>Ongoing</div>
                    <div className={styles.count}>{ongoing?.length}</div>
                  </div>
                </div>
              </Link>
              <div onClick={() => queueClick()} className={`${styles.project} ${styles.pthree}`}>
                <div className={styles.img}>
                  <Image src="/img/architect-dashboard/queue.svg" alt="queue" width={76} height={76} />
                </div>
                <div className={styles.right}>
                  <div className={styles.title}>Queue</div>
                  <div className={styles.count}>{queue?.length}</div>
                </div>
              </div>
            </div>
          </div>
          <Link href="/dashboard-settings" passHref>
            <div className={styles.dots}>
              <Image src="/img/architect-dashboard/3dots.svg" alt="queue" width={14.05} height={7.51} />
            </div>
          </Link>
          <div className={styles.add_new_project}>
            <button className={styles.btn} onClick={() => setAddProject(true)}>
              <img src="/img/architect-dashboard/add.svg" alt="" />
              Add project
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.right} ${styles.mobile}`}>
        <div className={styles.project_outer}>
          <Link href="/my-projects" passHref>
            <div className={`${styles.project} ${styles.pone}`}>
              <div className={styles.img}>
                <img src="/img/architect-dashboard/total_project.svg" alt="total" />
              </div>
              <div className={styles.right}>
                <div className={styles.title}>Projects</div>
                <div className={styles.count}>{allProjects?.length}</div>
              </div>
            </div>
          </Link>
          <Link href="/ongoing-project" passHref>
            <div className={`${styles.project} ${styles.ptwo}`}>
              <div className={styles.img}>
                <img src="/img/architect-dashboard/ongoing.svg" alt="ongoing" />
              </div>
              <div className={styles.right}>
                <div className={styles.title}>Ongoing</div>
                <div className={styles.count}>{ongoing?.length}</div>
              </div>
            </div>
          </Link>
          <div onClick={() => queueClick()} className={`${styles.project} ${styles.pthree}`}>
            <div className={styles.img}>
              <img src="/img/architect-dashboard/queue.svg" alt="queue" />
            </div>
            <div className={styles.right}>
              <div className={styles.title}>Queue</div>
              <div className={styles.count}>{queue?.length}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
