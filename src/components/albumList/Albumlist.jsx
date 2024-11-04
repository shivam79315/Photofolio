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
  const [albums, setAlbums] = useState([]); // State to store albums from Firestore

  useEffect(() => {
    if (albums.length === 0) {
      async function fetchCollectionData() {
        try {
          const querySnapshot = await getDocs(collection(db, "gallery"));
          const albumsData = querySnapshot.docs.map(doc => doc.data()); // Collect data into an array
          setAlbums(albumsData); // Update state with the album data
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }

      fetchCollectionData();
    }
  }, []); // Empty dependency array to run the effect once when the component mounts

  return (
    <div className={styles.listContainer}>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <Link to={`/${getAlbumRoute(album.albumName)}/images`} key={index}>
            <div className={styles.cardContainer}>
              <img src={imageSvg} alt="" />
              <span>{album.albumName}</span> {/* Use data.albumName here */}
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
