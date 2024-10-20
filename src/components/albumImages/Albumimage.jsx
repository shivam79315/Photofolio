import React, { useState, useContext } from "react"; 
import { useParams } from "react-router-dom";
import { AlbumContext } from "../../context/Albumcontext";
import styles from "./Albumimage.module.css";
import backArrow from '../../assets/logo/backArrow.svg';
import { Link } from "react-router-dom";

const Albumimage = () => {
//   const { albumName } = useParams(); 
//   const { albums } = useContext(AlbumContext); 
  const [inputData, setInputData] = useState("");
  const [inputUrl, setInputUrl] = useState("");

//   const currentAlbum = albums.find(album => album.replace(/\s+/g, '').toLowerCase() === albumName);

  const handleSubmit = (e) => {
    e.preventDefault();
      setInputUrl(""); 
      setInputData(""); 
    }

  const clearInput = () => {
    setInputData("");
    setInputUrl(""); 
  };

  return (
    <>
      < Link to='/'> <img className={styles.backArrow} src={backArrow} alt="" /> </Link>
      <div className={styles.imagesContainer}>
        <div className={styles.formContainer}>
          <span>Add new picture</span>
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
            <button className={styles.button17} onClick={clearInput}>
              Clear
            </button>
            <button
              className={styles.button17}
              type="submit"
              disabled={!inputData || !inputUrl}
            >
              Add Picture
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Albumimage;
