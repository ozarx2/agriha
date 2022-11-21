import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./sthree.module.css";

export default function FnSThree() {
  const [files, setFiles] = useState(true);

  return (
    <>
      <div className={styles.sthree_outer}>
        <div className={styles.sthree_inner}>
          <div className={styles.title}>
            <div className={styles.left}>
              Document files
              <span className={styles.dot}>
                <Image
                  src="/img/architect-dashboard/dot.svg"
                  alt="dot"
                  width={3}
                  height={3}
                />
              </span>
              <span className={styles.number}>2</span>
            </div>
            <Link href="/project-files" passHref>
              <div className={styles.right}>View all</div>
            </Link>
          </div>
          {files ? (
            <div className={styles.file_outer}>
              {Array.apply(null, { length: 5 }).map((e, i) => (
                <Link href="/project-files" key={i} passHref>
                  <div className={styles.file}>
                    <span className={styles.folder_img}>
                      <Image
                        src="/img/architect-dashboard/folder.svg"
                        alt="folder"
                        width={15.56}
                        height={14}
                      />
                    </span>
                    <div className={styles.file_title}>Old site plan</div>
                    <div className={styles.file_content}>
                      <span>ARC20212563</span>
                      <span className={styles.time}>2 Hrs ago</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.no_files}>
              <h3>“No files”</h3>
              <h5>Sorry, you have no files from home seeker</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
