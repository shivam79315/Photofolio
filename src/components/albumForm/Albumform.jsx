import { useState } from "react"; 
import styles from "./Albumform.module.css";
import { toast } from "react-toastify";
import {db} from '../../firebaseInit';
import { collection, addDoc } from 'firebase/firestore';

const Albumform = () => {
  const [inputData, setInputData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setInputData("");
    const docRef = await addDoc(collection(db, "gallery"), {
      albumName: inputData,
      createdOn : new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    toast.success("Album created Successfully")
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
          placeholder="Your album name..."
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