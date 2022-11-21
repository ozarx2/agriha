import React from "react";
import HeaderServices from "./HeaderServices";
import styles from "./ourServices.module.css";
import Image from "next/image";
import Footer from "./Footer";

const ServicesPage = () => {
  return (
    <div className={styles.servicesPage}>
      <HeaderServices />
      <div className={styles.servicesPage__container}>
        <div id="archServices" className={styles.cardServicePage}>
          <div className={styles.image__cardServicePage}>
            <Image src="/arch2.jpg" alt="" width={500} height={450} />
          </div>
          <div className={styles.content__cardServicePage}>
            <h2>Architectural services</h2>
            <p>
              Design, the creation of construction papers, and project
              management are all included in architectural services.
              Additionally, architects offer a wide range of services, such as
              project management, architectural programming, and feasibility
              studies.
            </p>
            <div className={styles.bottomImg__container}>
              <div>
                <Image src="/arch1.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/arch3.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/arch4.jpg" alt="" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>

        <div id="sitePlans" className={styles.cardServicePageBg}>
          <div className={styles.content__cardServicePageBg}>
            <h2>Site plans</h2>
            <p>
              A site plan, also known as a plot plan, is a form of drawing used
              by architects, landscape architects, urban planners, and engineers
              to represent the current and desired conditions for a specific
              area, usually a parcel of land that is to be altered.
            </p>
            <div className={styles.bottomImg__container}>
              <div>
                <Image src="/siteplan2.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/siteplan1.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/siteplan4.jpg" alt="" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className={styles.image__cardServicePage}>
            <Image src="/siteplan3.jpg" alt="" width={500} height={450} />
          </div>
        </div>

        <div id="floorPlans" className={styles.cardServicePage}>
          <div className={styles.image__cardServicePage}>
            <Image src="/floorPlan4.jpeg" alt="" width={500} height={450} />
          </div>
          <div className={styles.content__cardServicePage}>
            <h2>Floor plans</h2>
            <p>
              A floor plan is a technical drawing to scale that depicts the
              relationships between rooms, spaces, traffic patterns, and other
              physical characteristics on one level of a structure in
              architecture and building engineering.
            </p>
            <div className={styles.bottomImg__container}>
              <div>
                <Image src="/floorPlan2.jpeg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/floorPlan1.jpeg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/floorPlan5.jpeg" alt="" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>

        <div id="elevation" className={styles.cardServicePageBg}>
          <div className={styles.content__cardServicePageBg}>
            <h2>Elevation</h2>
            <p>
              Elevations are a popular design drawing and a technical
              architectural or engineering standard used to describe building
              graphically.
            </p>
            <div className={styles.bottomImg__container}>
              <div>
                <Image src="/elevation1.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/elevation2.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/elevation3.jpg" alt="" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className={styles.image__cardServicePage}>
            <Image src="/elevation4.jpg" alt="" width={500} height={450} />
          </div>
        </div>

        <div id="interiorDrawings" className={styles.cardServicePage}>
          <div className={styles.image__cardServicePage}>
            <Image src="/interior1.jpg" alt="" width={500} height={450} />
          </div>
          <div className={styles.content__cardServicePage}>
            <h2>Interior drawings</h2>
            <p>
              Space planning describes the process of determining the purpose,
              functional requirements, and basic layout of specific areas in a
              home or commercial building, and it is an absolutely essential
              part of the interior design process.
            </p>
            <div className={styles.bottomImg__container}>
              <div>
                <Image src="/interior2.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/interior3.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/interior4.jpg" alt="" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>

        <div id="3dViews" className={styles.cardServicePageBg}>
          <div className={styles.content__cardServicePageBg}>
            <h2>3D views</h2>
            <p>
              Using computer animation, 3D rendering is a technique for
              graphically representing a structure or creating a 3D model of the
              building.
            </p>
            <div className={styles.bottomImg__container}>
              <div>
                <Image src="/3d1.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/3d4.jpg" alt="" width={200} height={200} />
              </div>
              <div>
                <Image src="/3d3.jpg" alt="" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className={styles.image__cardServicePage}>
            <Image src="/3d2.jpg" alt="" width={500} height={450} />
          </div>
        </div>
      </div>
      <div className={styles.footerContainer__servicesPage}>
        <Footer />
      </div>
    </div>
  );
};

export default ServicesPage;
