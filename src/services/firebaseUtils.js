import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

export const saveUserData = async ({ uid, name, email }) => {
  try {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      createdAt: new Date(),
    });
    console.log("Datos del usuario guardados correctamente en users/{uid}");
  } catch (error) {
    console.error("Error al guardar los datos del usuario:", error);
  }
};

export const addGoals = async ({
  uid,
  startDate,
  endDate,
  price,
  description,
}) => {
  if (!uid) {
    console.error("UID inválido al intentar guardar journal.");
    return;
  }

  try {
    const GoalsRef = collection(doc(db, "users", uid), "Goals");
    await addDoc(GoalsRef, {
      startDate,
      endDate,
      price,
      description,
      date: serverTimestamp(),
    });
    console.log("Goal guardado correctamente");
  } catch (error) {
    console.error("Error guardando journal:", error);
  }
};

export const addSpend = async ({
  uid,
  startDate,
  category,
  price,
  description,
}) => {
  if (!uid) {
    console.error("UID inválido al intentar guardar journal.");
    return;
  }

  try {
    const SpendsRef = collection(doc(db, "users", uid), "Spends");
    await addDoc(SpendsRef, {
      startDate,
      category,
      price,
      description,
      date: serverTimestamp(),
    });
    console.log("Spend guardado correctamente");
  } catch (error) {
    console.error("Error guardando journal:", error);
  }
};

export const addJournal = async ({ uid, emotion, title, description }) => {
  if (!uid) {
    console.error("UID inválido al intentar guardar journal.");
    return;
  }

  try {
    const journalRef = collection(doc(db, "users", uid), "journals");
    await addDoc(journalRef, {
      emotion,
      title,
      description,
      date: serverTimestamp(),
    });
    console.log("Journal guardado correctamente");
  } catch (error) {
    console.error("Error guardando journal:", error);
  }
};

export const fetchSpends = async ({ uid }) => {
  if (!uid) return console.log("hola");

  try {
    const SpendsRef = collection(doc(db, "users", uid), "Spends");
    const snapshot = await getDocs(SpendsRef);
    const Spends = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Spends;
  } catch (error) {
    console.error("Error cargando journals:", error);
  }
};

export const fetchGoal = async ({ uid }) => {
  if (!uid) return console.log("hola");

  try {
    const GoalRef = collection(doc(db, "users", uid), "Goals");
    const snapshot = await getDocs(GoalRef);
    const Goal = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Goal;
  } catch (error) {
    console.error("Error cargando journals:", error);
  }
};
