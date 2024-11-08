import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Albumlist.module.css";
import imageSvg from "../../assets/logo/image-svg.svg";
import { toast } from "react-toastify";
import { collection, doc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";

const Albumlist = () => {
  const [albums, setAlbums] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [albumToEdit, setAlbumToEdit] = useState(null);
  const [inputData, setInputData] = useState("");
  const [isConfirmingEdit, setIsConfirmingEdit] = useState(false);
  
  const confirmationBoxRef = useRef();

  useEffect(() => {
    if (albums.length === 0) {
      const fetchCollectionData = async () => {
        try {
          const albumsRef = collection(db, "gallery");
          const unsubscribe = onSnapshot(albumsRef, (albumsSnapshot) => {
            const albumsData = albumsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAlbums(albumsData);
          });
          return unsubscribe;
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchCollectionData();
    }
  }, [albums]);

  // Disable scrolling when the confirmation box is open
  useEffect(() => {
    if (isConfirmingEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isConfirmingEdit]);

  // Handle clicks outside the confirmation box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (confirmationBoxRef.current && !confirmationBoxRef.current.contains(event.target)) {
        setIsConfirmingEdit(false);
        setAlbumToEdit(null);
      }
    };
    if (isConfirmingEdit) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isConfirmingEdit]);

  const handleDelete = async (albumId) => {
    if (isConfirming) {
      try {
        const imageDocRef = doc(db, "gallery", albumId);
        await deleteDoc(imageDocRef);
        toast.success("Album deleted successfully!");
        setIsConfirming(false);
        setAlbumToDelete(null);
      } catch (error) {
        console.error("Error deleting image: ", error);
        toast.error("Error deleting image!");
      }
    } else {
      setAlbumToDelete(albumId);
      setIsConfirming(true);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
    setAlbumToDelete(null);
  };

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleEdit = async (albumId) => {
    if (isConfirmingEdit && albumId) {
      try {
        const imageDocRef = doc(db, "gallery", albumId);
  
        await updateDoc(imageDocRef, {
          albumName: inputData,
          updatedOn: new Date(), 
        });
  
        setInputData("");
        toast.success("Album updated successfully!");
  
        setAlbumToEdit(null);
        setIsConfirmingEdit(false);
      } catch (error) {
        console.error("Error updating album:", error);
        toast.error("Error updating album!");
      }
    } else {
      setAlbumToEdit(albumId);
      setIsConfirmingEdit(true);
    }
  };
  

  const handleCancelEdit = () => {
    setIsConfirmingEdit(false);
    setAlbumToEdit(null);
  };

  return (
    <div className={styles.listContainer}>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <div className={styles.cardContainer} key={index}>
            <Link className={styles.imgSpanContainer} to={`/${album.id}`}>
              <img src={imageSvg} alt="" />
              <span className={styles.albumTitle}>{album.albumName}</span>
            </Link>
            <button className={styles.editBtn} onClick={() => handleEdit(album.id)}></button>
            <button className={styles.deleteBtn} onClick={() => handleDelete(album.id)}></button>
          </div>
        ))
      ) : (
        <span>No albums available</span>
      )}

      {isConfirming && (
        <div className={styles.confirmationBox}>
          <p>Are you sure you want to delete this Album?</p>
          <div className={styles.btnContainer}>
            <button onClick={() => handleDelete(albumToDelete)} className={styles.confirmBtn}></button>
            <button onClick={handleCancelDelete} className={styles.cancelBtn}></button>
          </div>
        </div>
      )}

      {isConfirmingEdit && (
        <div className={styles.overlay}>
          <div className={styles.confirmationBox} ref={confirmationBoxRef}>
            <p className={styles.editLine}>Update Album Name Here</p>
            <input
              className={styles.albumNameInput}
              value={inputData}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter new album name"
            />
            <div className={styles.btnContainer}>
              <button onClick={() => handleEdit(albumToEdit)} className={styles.confirmBtn}></button>
              <button onClick={handleCancelEdit} className={styles.cancelBtn}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albumlist;
