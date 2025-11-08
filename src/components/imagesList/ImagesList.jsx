import React, { useState, useEffect } from "react";
import styles from "./Images.module.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseInit";
import imageSvg from "../../assets/logo/image-svg.svg";
import Spinner from "react-spinner-material";

const ImagesList = ({ settingImageId, settingInputData, settingImageUrl }) => {
  const { albumId } = useParams();
  const [allImages, setAllImages] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = () => {
      try {
        const albumRef = doc(db, "gallery", albumId);
        const imagesCollectionRef = collection(albumRef, "Images");

        const unsubscribe = onSnapshot(
          imagesCollectionRef,
          (imagesSnapshot) => {
            const imagesList = imagesSnapshot.docs.map((doc) => {
            const data = doc.data();
              return {
                id: doc.id,
                imageUrl: data.imageUrl,
                imageName: data.imageName,
              };
            });

            setAllImages(imagesList);
            console.log(allImages)
            setIsLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      }
    };

    const unsubscribe = fetchImages();

    return () => unsubscribe && unsubscribe();
  }, [albumId]);

  // image download
  const handleDownload = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary anchor tag for downloading
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      // Cleanup the object URL
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image!");
    }
  };

  // Combined delete and confirmation handler
  const handleDelete = async (imageId) => {
    if (isConfirming) {
      try {
        const imageDocRef = doc(db, "gallery", albumId, "Images", imageId);
        await deleteDoc(imageDocRef);
        toast.success("Image deleted successfully!");
        setIsConfirming(false);
        setImageToDelete(null);
      } catch (error) {
        console.error("Error deleting image: ", error);
        toast.error("Error deleting image!");
      }
    } else {
      setImageToDelete(imageId);
      setIsConfirming(true);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
    setImageToDelete(null);
  };

  return (
    <div className={styles.listContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner size={40} color={"#A5DBFE"} visible={true} />
        </div>
      ) : allImages.length > 0 ? (
        allImages.map((url, index) => (
          <div key={index} className={styles.imageContainer}>
            <img
              className={styles.image}
              src={url.imageUrl || imageSvg}
              alt={url.imageName}
            />
            <span className={styles.title}>{url.imageName}</span>
            <button
              className={styles.editBtn}
              onClick={() => {
                settingImageId(url.id);
                settingInputData(url.imageName);
                settingImageUrl(url.imageUrl)
              }}
            ></button>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(url.id)}
            ></button>
            <button
              className={styles.downloadBtn}
              onClick={() =>
                handleDownload(url.image, `image_${index + 1}.jpg`)
              }
            ></button>
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
            <button
              onClick={() => handleDelete(imageToDelete)}
              className={styles.confirmBtn}
            >
              Yes
            </button>
            <button onClick={handleCancelDelete} className={styles.cancelBtn}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesList;