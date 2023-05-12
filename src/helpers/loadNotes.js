import { collection, getDocs } from "firebase/firestore/lite";
import { FirestoreDB } from "../firebase/config";

export const loadNotes = async (id = "") => {
  if (!id) throw Error("UID does not exists");
  const collectionRef = collection(
    FirestoreDB,
    `${id}/journal/notes`
  );
  const docsRef = await getDocs(collectionRef);
  console.log(docsRef);
  return docsRef.docs.map((d) => d.data());
};
