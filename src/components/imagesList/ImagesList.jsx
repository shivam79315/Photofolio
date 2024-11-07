import React, { useState, useEffect } from "react";
import styles from "./Images.module.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebaseInit";
import imageSvg from '../../assets/logo/image-svg.svg';

const ImagesList = ({ settingImageId }) => {
  const { albumId } = useParams();
  const [allImages, setAllImages] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      try {
        const albumRef = doc(db, "gallery", albumId);
        const imagesCollectionRef = collection(albumRef, "Images");

        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(imagesCollectionRef, (imagesSnapshot) => {
          const imagesList = imagesSnapshot.docs.flatMap((doc) => 
            Object.entries(doc.data())
              .filter(([key]) => key === "imageUrl")
              .map(([, value]) => ({ id: doc.id, image: value }))
          );
          setAllImages(imagesList);
        });

        // Clean up the listener on component unmount
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const unsubscribe = fetchImages();

    // Clean up subscription on component unmount
    return () => unsubscribe && unsubscribe();
  }, [albumId]);

  // Combined delete and confirmation handler
  const handleDelete = async (imageId) => {
    if (isConfirming) {
      // If the confirmation dialog is open, proceed with deletion
      try {
        const imageDocRef = doc(db, "gallery", albumId, "Images", imageId);
        await deleteDoc(imageDocRef); 
        toast.success("Image deleted successfully!");
        setIsConfirming(false); // Close the confirmation box after deletion
        setImageToDelete(null);
      } catch (error) {
        console.error("Error deleting image: ", error);
        toast.error("Error deleting image!");
      }
    } else {
      // If confirmation dialog is not open, open it for the selected image
      setImageToDelete(imageId);
      setIsConfirming(true);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirming(false); // Close the confirmation box
    setImageToDelete(null); // Reset the imageToDelete
  };

  return (
    <div className={styles.listContainer}>
      {allImages.length > 0 ? (
        allImages.map((url, index) => (
          <div key={index} className={styles.imageContainer}>
            <img className={styles.image} src={url.image || imageSvg} alt={`Image ${index + 1}`} />
            <button className={styles.editBtn} onClick={() => { settingImageId(url.id); console.log("Url id is", url.id); }}></button>
            <button className={styles.deleteBtn} onClick={() => handleDelete(url.id)}></button>
          </div>
        ))
      ) : (
        <span>Add your images here</span>
      )}

      {/* Confirmation Box */}
      {isConfirming && (
        <div className={styles.confirmationBox}>
          <p>Are you sure you want to delete this image?</p>
          <div className={styles.btnContainer}>
          <button onClick={() => handleDelete(imageToDelete)} className={styles.confirmBtn}>Yes</button>
          <button onClick={handleCancelDelete} className={styles.cancelBtn}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesList;
