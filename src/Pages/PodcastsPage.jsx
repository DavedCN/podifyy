import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setPodcasts } from "../redux/slices/podcastSlice";
import PodcastsCard from "../components/Podcasts/PodcastsCard";
import InputComponent from "../components/Common/input/input";
const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.Podcasts);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching user data", error);
        toast.error(error.message);
      }
    );

    // Return the unSubscribe function directly for cleanup
    return unSubscribe;
  }, [dispatch]);

  let filteredPodcasts = podcasts.filter((item) =>
    item.title?.trim().toLowerCase().includes(searchText?.trim().toLowerCase())
  );
  return (
    <>
      <div className="text-center w-full">
        <h1 className="text-xl font-medium mb-8 mt-8">Discover Podcasts</h1>

        <InputComponent
          state={searchText}
          setState={setSearchText}
          type="text"
          placeholder="Search By Title"
          required={true}
        />
        <div className="w-full  p-16 flex justify-between gap-5 flex-wrap">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.map((item) => (
              <PodcastsCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            ))
          ) : (
            <p>No Podcasts</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PodcastsPage;
