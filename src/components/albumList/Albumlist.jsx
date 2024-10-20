import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Albumlist.module.css";
import imageSvg from "../../assets/logo/image-svg.svg";
import { AlbumContext } from "../../context/Albumcontext";

const getAlbumRoute = (album) => {
  return album.title.replace(/\s+/g, '').toLowerCase(); 
};

const Albumlist = () => {
  const { albums } = useContext(AlbumContext);
  console.log(albums[5]);

  return (
    <>
      <div className={styles.listContainer}>
        {albums.length > 0 ? (
          albums.map((album, index) => (
              <Link to={`/${getAlbumRoute(album)}/images`}> 
            <div className={styles.cardContainer} key={index}> 
                <img src={imageSvg} alt="" />
                <span>{album.title}</span>
            </div>
              </Link>
          ))
        ) : (
          <span>No albums available</span>
        )}
      </div>
    </>
  );
};

export default Albumlist;
