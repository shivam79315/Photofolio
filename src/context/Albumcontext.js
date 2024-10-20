import React, { createContext, useState } from "react";

export const AlbumContext = createContext();

// Provider component
export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([
    { title: "test1", images: [] },
    { title: "test2", images: [] },
    { title: "Family Adventures", images: [] },
    { title: "Summer Memories", images: [] },
    { title: "Moments of Joy", images: [] },
    { title: "Wedding Bliss", images: [] },
    { title: "Travel Diaries", images: [] },
    { title: "Nature's Beauty", images: [] },
    { title: "Birthday Celebrations", images: [] },
    { title: "Graduation Day", images: [] },
    { title: "Holiday Escapes", images: [] },
    { title: "Friends Forever", images: [] },
    { title: "Our Love Story", images: [] },
    { title: "Mountain Getaway", images: [] },
    { title: "Beach Vibes", images: [] },
    { title: "Urban Exploration", images: [] },
    { title: "Pets & Paws", images: [] },
    { title: "Spring Blossoms", images: [] },
    { title: "Sunset Chronicles", images: [] },
    { title: "Festive Fun", images: [] },
    { title: "Childhood Treasures", images: [] },
    { title: "Autumn Leaves", images: [] },
  ]);

  const addAlbum = (title) => {
    const albumExists = albums.some(album => album.title === title);
    if (!albumExists) {
      const newAlbum = { title, images: [] };
      setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
    }
  };

  const removeAlbum = (title) => {
    setAlbums((prevAlbums) => prevAlbums.filter(album => album.title !== title));
  };

  return (
    <AlbumContext.Provider value={{ albums, addAlbum, removeAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
};
