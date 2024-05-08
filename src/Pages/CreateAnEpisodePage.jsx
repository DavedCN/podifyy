import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Common/Button/Button";
import { toast } from "react-toastify";
import InputComponent from "../components/Common/input/input";
import FileInput from "../components/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage = () => {
  const { Id } = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };
  const handleSubmit = async () => {
    setLoading(true);

    if (title && desc && audioFile && Id) {
      try {
        const audioref = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioref, audioFile);
        const audioUrl = await getDownloadURL(audioref);

        const episodedata = {
          title,
          description: desc,
          audioFile: audioUrl,
          podcastId: Id,
        };

        await addDoc(collection(db, "podcasts", Id, "episodes"), episodedata);

        toast.success("Episode Created");
        setLoading(false);

        navigate(`/podcast/${Id}`);
        setTitle("");
        setDesc("");
        setAudioFile(null);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };

  return (
    <div className="max-container ">
      <h1 className="m-8">Create An Episode</h1>

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
        accept="audio/*"
        id="audio"
        fileHandlenc={audioFileHandle}
        text="Upload Audio File"
      />

      <Button
        text={loading ? "Loading..." : "Create Episode"}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreateAnEpisodePage;
