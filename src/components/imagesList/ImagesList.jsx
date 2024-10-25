import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Images.module.css";
import imageSvg from "../../assets/logo/image-svg.svg";
import { AlbumContext } from "../../context/Albumcontext";

const getAlbumRoute = (album) => {
  return album.title.replace(/\s+/g, '').toLowerCase(); 
};

const ImagesList = () => {
  const { albums } = useContext(AlbumContext);

  return (
    <>
      <div className={styles.listContainer}>
        {albums[1].images.length > 0 ? (
          albums[1].images.map((image, index) => (
                <img src={image} alt="" />
          ))
        ) : (
          <span>No albums available</span>
        )}
      </div>
    </>
  );
};

export default ImagesList;
