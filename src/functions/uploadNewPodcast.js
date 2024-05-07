import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { auth, storage } from "../firebase/firebase";

export const uploadFile = async (file, path) => {
  const fileRef = ref(
    storage,
    `${path}/${auth.currentUser.uid}/${Date.now()}`
  );

  await uploadBytes(fileRef, file);
  const imageUrl = await getDownloadURL(fileRef);


  return imageUrl;
};
