import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore/lite";

export const addUser = async ({ uidUser, name, Email, Fecha }) => {
  const docRef = await addDoc(collection(db, "products"), {
    uidUser,
    name,
    Email,
  });
  console.log("Document written with ID: ", docRef.id);
};
