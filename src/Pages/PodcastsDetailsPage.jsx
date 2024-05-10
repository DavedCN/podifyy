import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Common/Button/Button";
import EpisodeDetails from "../components/Podcasts/EpisodesDetails";
const PodcastsDetailsPage = () => {
  const { Id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Id) {
      getData();
    }
  });

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", Id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcast({ id: Id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case

        toast.error("No such podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", Id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ ...doc.data(), id: doc.id });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        toast.error(error.message);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [Id]);

  return (
    <>
      <div className="w-full flex justify-center items-start px-10 md:px-32 mt-2 flex-col ">
        {podcast.id && (
          <>
            <div className="w-full flex justify-between">
              <h1 className="text-xl py-2  my-4">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  text="Create Episode"
                  onClick={() =>
                    navigate(`/podcast/${podcast.id}/create-episode`)
                  }
                  width={"w-1/10"}
                  margin={"my-4"}
                />
              )}
            </div>{" "}
            <img
              className="w-full h-56 rounded-lg object-fit opacity-65"
              src={podcast.bannerImage}
              alt={podcast.title}
            />
            <p className="my-2 text-purple-grey text-xl">
              {podcast.description}
            </p>
            <h1 className="text-2xl my-2">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => (
                  <EpisodeDetails
                    key={episode.id}
                    index={index + 1}
                    title={episode.title}
                    desc={episode.description}
                    audioFile={episode.audioFile}
                    onClick={(file) => console.log("Playing", file)}
                  />
                ))}
              </>
            ) : (
              <p className="ml-1">No episodes</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PodcastsDetailsPage;
