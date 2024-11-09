import React, { useState } from "react";
import styles from "./Imageform.module.css";
import backArrow from "../../assets/logo/backArrow.svg";
import { Link } from "react-router-dom";
import ImagesList from "../imagesList/ImagesList";
import { toast } from "react-toastify";
import { db } from "../../firebaseInit";
import { useParams } from "react-router-dom";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";

const Albumimage = () => {
  const [inputData, setInputData] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [imageId, setImageId] = useState("");
  
  const { albumId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData && inputUrl) {
      try {
        const albumRef = doc(db, "gallery", albumId);
        const imagesCollectionRef = collection(albumRef, "Images");
        const imageDocRef = imageId ? doc(imagesCollectionRef, imageId) : null;

        const imageData = { imageName: inputData, imageUrl: inputUrl };

        if (imageId) {
          await updateDoc(imageDocRef, imageData);
          toast.success("Image updated successfully!");
        } else {
          await addDoc(imagesCollectionRef, imageData);
          toast.success("Image added successfully!");
        }

        setInputData("");
        setInputUrl("");
        setImageId("");
      } catch (error) {
        console.error("Error adding or updating image:", error);
        toast.error("Error adding or updating image.");
      }
    } else {
      toast.error("Please enter both image name and URL.");
    }
  };

  return (
    <>
      <Link to="/">
        <img className={styles.backArrow} src={backArrow} alt="Back" />
      </Link>
      <div className={styles.imagesContainer}>
        <div className={styles.formContainer}>
          <span>{imageId ? "Edit Picture" : "Add New Picture"}</span>
          <form onSubmit={handleSubmit}>
            <div className={styles.addPictureContainer}>
              <div className={styles.inputsContainer}>
                <input
                  className={styles.input}
                  name="inputData"
                  type="text"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="Picture Name"
                />
                <input
                  className={styles.input}
                  name="inputUrl"
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Picture URL"
                />
              </div>
              <button className={styles.button17} type="submit">
                {imageId ? "Update Picture" : "Add Picture"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ImagesList settingImageId={setImageId} />
    </>
  );
};

export default Albumimage;
