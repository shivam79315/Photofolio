import React from 'react';
import styles from './Nav.module.css';
import galleryLogo from '../../assets/logo/galleryLogo.webp';

const Nav = () => {
  return (
    <>
        <div className={styles.navContainer}>
            <img src={galleryLogo} alt="Gallery Logo" className={styles.logo} />
            <span>PhotoFolio</span>
        </div>
    </>
  )
}

export default Nav