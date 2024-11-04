import React, { createContext, useState } from "react";

export const AlbumContext = createContext();

// Provider component
export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([
    { id: 1, title: "test1", images: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fheidmann.com%2F%3Fpage_id%3D15&psig=AOvVaw0ZYQWQrcfYpy2COd5K6kiC&ust=1729867485358000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCu8qeqp4kDFQAAAAAdAAAAABAE'] },
    { id: 2, title: "test2", images: [{
      
    }] },
    { id: 3, title: "Family Adventures", images: [] },
    { id: 4, title: "Summer Memories", images: [] },
    { id: 5, title: "Moments of Joy", images: [] },
    { id: 6, title: "Wedding Bliss", images: [] },
    { id: 7, title: "Travel Diaries", images: [] },
    { id: 8, title: "Nature's Beauty", images: [] },
    { id: 9, title: "Birthday Celebrations", images: [] },
    { id: 10, title: "Graduation Day", images: [] },
    { id: 11, title: "Holiday Escapes", images: [] },
    { id: 12, title: "Friends Forever", images: [] },
    { id: 13, title: "Our Love Story", images: [] },
    { id: 14, title: "Mountain Getaway", images: [] },
    { id: 15, title: "Beach Vibes", images: [] },
    { id: 16, title: "Urban Exploration", images: [] },
    { id: 17, title: "Pets & Paws", images: [] },
    { id: 18, title: "Spring Blossoms", images: [] },
    { id: 19, title: "Sunset Chronicles", images: [] },
    { id: 20, title: "Festive Fun", images: [] },
    { id: 21, title: "Childhood Treasures", images: [] },
    { id: 22, title: "Autumn Leaves", images: [] },
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
