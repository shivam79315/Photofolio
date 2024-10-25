import React, { useState } from 'react';
import styles from './Herosection.module.css';
import Albumform from '../albumForm/Albumform';
import Albumlist from '../albumList/Albumlist';
import ImagesList from '../imagesList/ImagesList';

const Herosection = () => {
 
    const [ isCreate, setIsCreate ] = useState(true);

    const toggleBtn = () => {
        setIsCreate(prevState => !prevState);
     }


  return (
    <>
        {isCreate && <Albumform />}
        <div className={styles.heroSection}>
            <div className={styles.head}>
                <span>Your Albums</span>
                <button className={styles.createAddBtn} onClick={toggleBtn}>{isCreate?"Create Album":"Add Album"}</button>
            </div>
            <div className={styles.bodySection}>
            <Albumlist />
            < ImagesList />
            </div>
        </div>
    </>
  )
}

export default Herosection