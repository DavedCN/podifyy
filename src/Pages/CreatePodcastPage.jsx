import { useState } from "react";
import StartPodcastForm from "../components/StartAPodcast/StartPodcastForm";

const CreatePodcastPage = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div className="w-full flex justify-center items-center flex-col  mt-16">
      <h1 className="text-2xl text-center font-semibold mb-8 ">
        Create A Podcast
      </h1>

      <StartPodcastForm />
    </div>
  );
};

export default CreatePodcastPage;
