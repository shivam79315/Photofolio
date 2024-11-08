import React, { useState, useRef } from "react";
import styles from "./Albumimage.module.css";
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
  const [file, setFile] = useState(null); // New state to handle file

  const { albumId } = useParams();
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData && inputUrl) {
      try {
        const albumRef = doc(db, "gallery", albumId);
        const imagesCollectionRef = collection(db, "gallery", albumId, "Images");
        const imageDocRef = imageId ? doc(albumRef, "Images", imageId) : null;

        const imageData = { imageName: inputData, imageUrl: inputUrl };

        if (imageId) {
          await updateDoc(imageDocRef, imageData); // Update existing image
          toast.success("Image updated successfully!");
        } else {
          await addDoc(imagesCollectionRef, imageData); // Add new image
          toast.success("Image added successfully!");
        }

        // Clear inputs after submission
        setInputUrl("");
        setInputData("");
        setImageId("");
      } catch (error) {
        console.error("Error adding or updating image:", error);
        toast.error("Error adding or updating image.");
      }
    } else {
      toast.error("Please enter both image name and URL.");
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
        setFile(selectedFile);
        const fileUrl = URL.createObjectURL(selectedFile); // Create URL for the selected file
        setInputUrl(fileUrl); // Set the URL for the image
      } else {
        toast.error('Please upload a valid image file (.jpg, .jpeg, .png)');
      }
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const imageData = {
          imageName: inputData,
          imageUrl: inputUrl,
        };

        const albumRef = doc(db, "gallery", albumId);
        const imagesCollectionRef = collection(albumRef, "Images");

        await addDoc(imagesCollectionRef, imageData);
        toast.success("Image uploaded successfully!");
        
        // Clear inputs and reset file after upload
        setInputData("");
        setInputUrl("");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }  
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image.");
      }
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  return (
    <>
      <Link to="/">
        <img className={styles.backArrow} src={backArrow} alt="Back" />
      </Link>
      <div className={styles.imagesContainer}>
        <div className={styles.formContainer}>
          <span>{imageId ? "Edit picture" : "Add new picture"}</span>
          <form onSubmit={handleSubmit}>
            <div className={styles.addPictureContainer}>
              <div className={styles.inputsContainer}>
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
                />
              </div>
              <button className={styles.button17} type="submit">
                {imageId ? "Update Picture" : "Add Picture"}
              </button>
            </div>
            <span>OR</span>
          </form>
          
          {/* File upload input */}
          <input className={styles.uploadBtn} type="file" ref={fileInputRef} onChange={handleFileSelect} />
          {file && (
            <button className={styles.button17} onClick={handleUpload}>
              {imageId ? "Update Picture" : "Upload Picture"}
            </button>
          )}
        </div>
      </div>

      <ImagesList settingImageId={setImageId} />
    </>
  );
};

export default Albumimage;
