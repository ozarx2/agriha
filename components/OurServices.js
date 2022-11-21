import React from "react";
import styles from "./ourServices.module.css";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import Link from "next/link";

const OurServices = () => {
  return (
    <div className={styles.ourServices} id="ourServices">
      <div className={styles.title__ourServices}>
        <div className={styles.top__title__ourServices}>
          <h2>Our Services</h2>
        </div>
        <p>
          We provide complete service from conception to completion including
          the delivery of detailed plans, specifications and drawings that
          reflect the cultures, customs and traditions of our region.
        </p>
      </div>
      <div className={styles.caroserContainerMain}>
        <Carousel
          indicatorIconButtonProps={{
            style: {
              margin: "5px",
              background: "transparent",
              border: "1px solid #119076",
              color: "#f1fcff",
              height: 15,
              width: 15,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#119076",
            },
          }}
          animation="slide"
          duration="500"
          swipe="true"
          interval="3000"
          navButtonsAlwaysInvisible="true"
        >
          <div className={styles.caroselContainer}>
            <div className={styles.card__ourServices}>
              <div className={styles.left__card__ourServices}>
                <div>
                  <Image src="/archsrvs.svg" alt="" width={80} height={80} />
                </div>
              </div>
              <div className={styles.right__card__ourServices}>
                <h4>Architectural services</h4>
                <p>
                  Design, the creation of construction papers, and project
                  management are all included in...
                </p>
                <Link
                  href="/view-services"
                  className={styles.viewServiceButton}
                  passHref
                >
                  <div className={styles.viewServiceButton}>View Service</div>
                </Link>
              </div>
            </div>
            <div className={styles.card__ourServices}>
              <div className={styles.left__card__ourServices}>
                <div>
                  <Image src="/sitePlan.svg" alt="" width={70} height={70} />
                </div>
              </div>
              <div className={styles.right__card__ourServices}>
                <h4>Site plans</h4>
                <p>
                  A site plan, also known as a plot plan, is a form of drawing
                  used by architects, landscape architects...
                </p>
                <Link
                  href="/view-services"
                  className={styles.viewServiceButton}
                  passHref
                >
                  <div className={styles.viewServiceButton}>View Service</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.caroselContainer}>
            <div className={styles.card__ourServices}>
              <div className={styles.left__card__ourServices}>
                <div>
                  <Image
                    src="/floorPlanIcon.svg"
                    alt=""
                    width={80}
                    height={80}
                  />
                </div>
              </div>
              <div className={styles.right__card__ourServices}>
                <h4>Floor plans</h4>
                <p>
                  A floor plan is a technical drawing to scale that depicts the
                  relationships between rooms, spaces...
                </p>
                <Link
                  href="/view-services"
                  className={styles.viewServiceButton}
                  passHref
                >
                  <div className={styles.viewServiceButton}>View Service</div>
                </Link>
              </div>
            </div>
            <div className={styles.card__ourServices}>
              <div className={styles.left__card__ourServices}>
                <div>
                  <Image src="/elevation.svg" alt="" width={90} height={90} />
                </div>
              </div>
              <div className={styles.right__card__ourServices}>
                <h4>Elevation</h4>
                <p>
                  Elevations are a popular design drawing and a technical
                  architectural or engineering standard ...
                </p>
                <Link
                  href="/view-services"
                  className={styles.viewServiceButton}
                  passHref
                >
                  <div className={styles.viewServiceButton}>View Service</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.caroselContainer}>
            <div className={styles.card__ourServices}>
              <div className={styles.left__card__ourServices}>
                <div>
                  <Image src="/interior.svg" alt="" width={90} height={90} />
                </div>
              </div>
              <div className={styles.right__card__ourServices}>
                <h4>Interior drawings</h4>
                <p>
                  Space planning describes the process of determining the
                  purpose, functional requirements...
                </p>
                <Link
                  href="/view-services"
                  className={styles.viewServiceButton}
                  passHref
                >
                  <div className={styles.viewServiceButton}>View Service</div>
                </Link>
              </div>
            </div>
            <div className={styles.card__ourServices__end}>
              <div className={styles.left__card__ourServices}>
                <div>
                  <Image src="/3D.svg" alt="" width={90} height={90} />
                </div>
              </div>
              <div className={styles.right__card__ourServices}>
                <h4>3D views</h4>
                <p>
                  Using computer animation, 3D rendering is a technique for
                  graphically representing a structure or creating...
                </p>
                <Link
                  href="/view-services"
                  className={styles.viewServiceButton}
                  passHref
                >
                  <div className={styles.viewServiceButton}>View Service</div>
                </Link>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      <div className={styles.caroselContainer__mobile}>
        <Carousel
          indicatorIconButtonProps={{
            style: {
              marginRight: "15px",
              background: "transparent",
              border: "1px solid #119076",
              color: "#f1fcff",
              height: 15,
              width: 15,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#119076",
            },
          }}
          animation="slide"
          duration="500"
          swipe="true"
          interval="3000"
          navButtonsAlwaysInvisible="true"
        >
          <div className={styles.card__ourServicesMobile}>
            <div className={styles.left__card__ourServices}>
              <div>
                <Image src="/archsrvs.svg" alt="" width={70} height={70} />
              </div>
            </div>
            <div className={styles.right__card__ourServices}>
              <h4>Architectural services</h4>
              <p>
                Design, the creation of construction papers, and project
                management are all included in...
              </p>
              <Link
                href="/view-services"
                className={styles.viewServiceButton}
                passHref
              >
                <div className={styles.viewServiceButton}>View Service</div>
              </Link>
            </div>
          </div>
          <div className={styles.card__ourServicesMobile}>
            <div className={styles.left__card__ourServices}>
              <div>
                <Image src="/sitePlan.svg" alt="" width={60} height={60} />
              </div>
            </div>
            <div className={styles.right__card__ourServices}>
              <h4>Site plans</h4>
              <p>
                A site plan, also known as a plot plan, is a form of drawing
                used by architects...
              </p>
              <Link
                href="/view-services"
                className={styles.viewServiceButton}
                passHref
              >
                <div className={styles.viewServiceButton}>View Service</div>
              </Link>
            </div>
          </div>
          <div className={styles.card__ourServicesMobile}>
            <div className={styles.left__card__ourServices}>
              <div>
                <Image src="/floorPlanIcon.svg" alt="" width={70} height={70} />
              </div>
            </div>
            <div className={styles.right__card__ourServices}>
              <h4>Floor plans</h4>
              <p>
                A floor plan is a technical drawing to scale that depicts the
                relationships between...
              </p>
              <Link
                href="/view-services"
                className={styles.viewServiceButton}
                passHref
              >
                <div className={styles.viewServiceButton}>View Service</div>
              </Link>
            </div>
          </div>
          <div className={styles.card__ourServicesMobile}>
            <div className={styles.left__card__ourServices}>
              <div>
                <Image src="/elevation.svg" alt="" width={80} height={80} />
              </div>
            </div>
            <div className={styles.right__card__ourServices}>
              <h4>Elevation</h4>
              <p>
                Elevations are a popular design drawing and a technical
                architectural or...
              </p>
              <Link
                href="/view-services"
                className={styles.viewServiceButton}
                passHref
              >
                <div className={styles.viewServiceButton}>View Service</div>
              </Link>
            </div>
          </div>
          <div className={styles.card__ourServicesMobile}>
            <div className={styles.left__card__ourServices}>
              <div>
                <Image src="/interior.svg" alt="" width={80} height={80} />
              </div>
            </div>
            <div className={styles.right__card__ourServices}>
              <h4>Interior drawings</h4>
              <p>
                Space planning describes the process of determining the purpose,
                functional...
              </p>
              <Link
                href="/view-services"
                className={styles.viewServiceButton}
                passHref
              >
                <div className={styles.viewServiceButton}>View Service</div>
              </Link>
            </div>
          </div>
          <div className={styles.card__ourServicesMobile}>
            <div className={styles.left__card__ourServices}>
              <div>
                <Image src="/3D.svg" alt="" width={80} height={80} />
              </div>
            </div>
            <div className={styles.right__card__ourServices}>
              <h4>3D views</h4>
              <p>
                Using computer animation, 3D rendering is a technique for
                graphically representing...
              </p>
              <Link
                href="/view-services"
                className={styles.viewServiceButton}
                passHref
              >
                <div className={styles.viewServiceButton}>View Service</div>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default OurServices;
