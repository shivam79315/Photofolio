import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Albumlist.module.css";
import imageSvg from "../../assets/logo/image-svg.svg";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebaseInit";

const getAlbumRoute = (albumName) => {
  const albumRoute = encodeURIComponent(albumName);
  return decodeURIComponent(albumRoute);
}

const Albumlist = () => {
  const [albums, setAlbums] = useState([]); 

  useEffect(() => {
    if (albums.length === 0) {
      async function fetchCollectionData() {
        try {
          const querySnapshot = await getDocs(collection(db, "gallery"));
          const albumsData = querySnapshot.docs.map(doc => ( {id: doc.id, ...doc.data()})); 
          setAlbums(albumsData); 
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }

      fetchCollectionData();
    }
  }, []); 

  return (
    <div className={styles.listContainer}>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <Link to={`/${album.id}`} key={index}>
            <div className={styles.cardContainer}>
              <img src={imageSvg} alt="" />
              <span>{album.albumName}</span> 
            </div>
          </Link>
        ))
      ) : (
        <span>No albums available</span>
      )}
    </div>
  );
};

export default Albumlist;
