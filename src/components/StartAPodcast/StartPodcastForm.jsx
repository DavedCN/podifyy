import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Common/Button/Button";
import InputComponent from "../Common/input/input";
import FileInput from "../Input/FileInput";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { uploadFile } from "../../functions/uploadNewPodcast";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Centralized error handling in the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let bannerImageUrl, displayImageUrl;

      if (title && desc && displayImage && banner) {
        toast.success("Handling Form");
        setLoading(true);

        // Upload Files

        bannerImageUrl = await uploadFile(banner, "podcasts");
        displayImageUrl = await uploadFile(displayImage, "podcasts");

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };



        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        toast.success("Podcast Created!");

        setTitle("");
        setDesc("");
        setDisplayImage(null);
        setBanner(null);
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const bannerImageHandler = (file) => {
    setBanner(file);
  };

  const bannerdpHandler = (file) => {
    setDisplayImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        type="text"
        placeholder="Title"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        type="text"
        placeholder="Description"
        required={true}
      />

      <FileInput
        accept="image/*"
        id="display-image"
        fileHandlenc={bannerdpHandler}
        text="Display Image"
      />
      <FileInput
        accept="image/*"
        id="banner-image"
        fileHandlenc={bannerImageHandler}
        text="Banner Image"
      />

      <Button
        text={loading ? "loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreatePodcastForm;
