import React, { useContext, useState } from "react";
import styles from "./Albumform.module.css";
import { AlbumContext } from "../../context/Albumcontext";
import { toast } from "react-toastify";

const Albumform = () => {
  const [inputData, setInputData] = useState("");

  const { addAlbum } = useContext(AlbumContext);
//   const context = useContext(AlbumContext);
// console.log(context);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAlbum(inputData); 
    setInputData("");
    {toast.success("Album create Successfully")}
  };

  const clearInput = () => {
    setInputData("");
  };

  return (
    <div className={styles.formContainer}>
      <span>Create an Album</span>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="inputData"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          required
        />
        <button className={styles.button17} onClick={clearInput}>
          Clear
        </button>
        <button className={styles.button17} type="submit" disabled={!inputData}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Albumform;
