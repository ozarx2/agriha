import Image from "next/image";
import React from "react";
import Cardnav from "./Cardnav";
import styles from "../styles/selectProject.module.css";

const SelectType = () => {
  const projectlist = [
    {
      title: "Residential",
      image: "/project1.png",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non commodi possimus,",
      indicator_color: "#c25c3f",
      bgColor: "#FFF6F6",
    },
    {
      title: "Commercial Building",
      image: "/commercial.png",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non commodi possimus,",
      indicator_color: "#78B9EB",
      bgColor: "#F4FAFF",
    },
  ];

  const handleSelection = (type) => {
    console.log(type);
    handleSubmit(type);
  };

  const handleSubmit = (type) => {
    if (type === "Residential") {
      localStorage.setItem("selectType", "ResidentialSelected");
      window.location.href = "/Filldata";
    }
    if (type === "Commercial Building") {
      localStorage.setItem("selectType", "interiorSelected");
      window.location.href = "/commercialInterior";
    }
  };

  const cards = projectlist.map((items, index) => {
    return (
      <>
        <div
          style={{ backgroundColor: items.bgColor }}
          className={styles.selectCards}
          key={index}
        >
          <div className={styles.indicators}>
            <div></div>
            <div
              style={{ backgroundColor: items.indicator_color }}
              className={styles.selected_right}
            ></div>
          </div>
          <div className={styles.projectImages}>
            <Image alt="" src={items.image} width={100} height={80} />
          </div>
          <div className={styles.cardTitle}>
            <h4>{items.title}</h4>
            <p>{items.desc}</p>
          </div>

          <div
            className={styles.cardButton}
            onClick={() => handleSelection(items.title)}
          >
            select
          </div>
        </div>
      </>
    );
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardMain}>
        <Cardnav
          title="Interior"
          description="Select Building type for interior"
        />
        <div className={styles.cardContent}>{cards}</div>
      </div>
    </div>
  );
};

export default SelectType;
