import { Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header/Header";
import SignInOrUp from "./components/SignInOrUp/SignInOrUp";
import ProfilePage from "./Pages/ProfilePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import PrivateRoutes from "./components/Common/PrivateRoutes.jsx";
import CreatePodcastPage from "./Pages/CreatePodcastPage.jsx";
import PodcastsPage from "./Pages/PodcastsPage.jsx";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  fullname: userData.fullname,
                  email: userData.email,
                  uid: userData.uid,
                  // profilePic: userData.photoURL,
                })
              );
            }
          },
          (error) => {
            console.log("Error fetching user data", error);
            toast.error(error.message);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }

      return unSubscribeAuth();
    });
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignInOrUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="createpodcast" element={<CreatePodcastPage />} />
          <Route path="podcasts" element={<PodcastsPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
