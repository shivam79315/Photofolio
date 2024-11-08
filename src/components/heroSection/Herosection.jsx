import React, { useState } from 'react';
import styles from './Herosection.module.css';
import Albumform from '../albumForm/Albumform';
import Albumlist from '../albumList/Albumlist';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigating to edit page

const Herosection = () => {
    const [isCreate, setIsCreate] = useState(true); // Track if it's create or edit mode
    const [currentAlbumId, setCurrentAlbumId] = useState(null); // To store albumId for editing
    const navigate = useNavigate(); // To programmatically navigate

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
            {isCreate ? (
                <Albumform albumId={currentAlbumId} />
            ) : (
                <Albumform albumId={currentAlbumId} />
            )}

            <div className={styles.heroSection}>
                <div className={styles.head}>
                    <span>Your Albums</span>
                    <button
                        className={styles.createAddBtn}
                        onClick={toggleBtn}
                    >
                        {isCreate ? 'Create Album' : 'Add Album'}
                    </button>
                </div>
                <div className={styles.bodySection}>
                    <Albumlist onEdit={handleEdit} />
                </div>
            </div>
        </>
    );
};

export default Herosection;
