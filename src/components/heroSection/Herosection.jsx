import React, { useState } from 'react';
import styles from './Herosection.module.css';
import Albumform from '../albumForm/Albumform';
import Albumlist from '../albumList/Albumlist';

const Herosection = () => {
    const [isCreate, setIsCreate] = useState(true); 
    const [currentAlbumId, setCurrentAlbumId] = useState(null);
    const toggleBtn = () => {
        if (isCreate) {
            // If it's create mode, we set currentAlbumId to null
            setCurrentAlbumId(null);
        }
        setIsCreate(prevState => !prevState);
    };

    // To handle when an album edit button is clicked
    const handleEdit = (albumId) => {
        setIsCreate(false);  
        setCurrentAlbumId(albumId);  
    };

    return (
        <>
            {/* Pass the currentAlbumId if we are editing */}
            <Albumform albumId={isCreate ? null : currentAlbumId} />

            <div className={styles.heroSection}>
                <div className={styles.head}>
                    <span>Your Albums</span>
                    <button
                        className={styles.createAddBtn}
                        onClick={toggleBtn}
                    >Create Album</button>
                </div>
                <div className={styles.bodySection}>
                    <Albumlist onEdit={handleEdit} />
                </div>
            </div>
        </>
    );
};

export default Herosection;
