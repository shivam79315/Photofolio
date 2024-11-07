import React, { useState } from "react";
import styles from "./Albumimage.module.css";
import backArrow from '../../assets/logo/backArrow.svg';
import { Link } from "react-router-dom";
import ImagesList from "../imagesList/ImagesList";
import { toast } from "react-toastify";
import { db } from "../../firebaseInit";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';

const Albumimage = () => {
  const [inputData, setInputData] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const { albumId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const albumRef = doc(db, "gallery", albumId);
      const imagesCollectionRef = collection(albumRef, "Images");

      // If editing an existing image, delete the previous image first
      if (imageId) {
        // Delete the previous image document
        await deleteDoc(doc(imagesCollectionRef, imageId));
        console.log(`Deleted image with ID: ${imageId}`);
      }

      // Prepare the new image data
      const newImageData = {
        imageName: inputData, 
        imageUrl: inputUrl,   
      };

      // Add the new image data to Firestore
      const newImageRef = doc(imagesCollectionRef); // Automatically generates a new document ID for new images
      await setDoc(newImageRef, newImageData);
      console.log(`Image added with name "${inputData}" and URL "${inputUrl}"`);

      // Show success toast
      toast.success("Image updated successfully!");

      // Clear input fields
      setInputUrl(""); 
      setInputData("");
      setImageId(""); 
  
    } catch (error) {
      console.error("Error updating image: ", error);
      toast.error("Error updating image.");
    }
  };

  return (
    <>
      <Link to='/'>
        <img className={styles.backArrow} src={backArrow} alt="Back" />
      </Link>
      <div className={styles.imagesContainer}>
        <div className={styles.formContainer}>
          <span>{imageId ? "Edit picture" : "Add new picture"}</span>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              name="inputData"
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Picture name"
            />
            <input
              className={styles.input}
              name="inputUrl"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Picture URL"
              required
            />
            <button
              className={styles.button17}
              type="submit"
              disabled={!inputData || !inputUrl}
            >
              {imageId ? "Update Picture" : "Add Picture"}
            </button>
          </form>
        </div>
      </div>

      <ImagesList settingImageId={setImageId} />
    </>
  );
};

export default Albumimage;
