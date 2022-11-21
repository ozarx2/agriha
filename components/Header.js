import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <div className={styles.headerMain}>
        <div className={styles.header__left}>
          <Link href="/" passHref>
            <Image
              className={styles.header__logo}
              src="/agrihaLogo2.png"
              alt="agriha Logo"
              width={120}
              height={100}
            />
          </Link>
        </div>
        <div className={styles.header__right}></div>
      </div>
    </div>
  );
};

export default Header;
