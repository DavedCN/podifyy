import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/Common/Button/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.User);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);

      toast.success("Sign Out Successful");
      // Dispatch an action to clear the user state
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const handleClick = (goto) => {
    navigate(goto);
  };

  return (
    <>
      <div className="max-container pt-5">
        <img
          className="w-32 h-32 rounded-full border-none mb-5 object-fit"
          src={user?.profilePic}
          alt=""
        />
        <div className=" px-20 text-center">
          <p className="text-xl font-bold p-2"> {user?.fullname}</p>
          <p className="text-xxl font-bold p-2"> {user?.email}</p>
        </div>
        <div className="flex mt-10">
          <Button
            width={"w-22"}
            text="View Podcasts"
            onClick={() => handleClick("/podcasts")}
          />
          <Button
            width={"w-22"}
            text="Create Podcast"
            onClick={() => handleClick("/createpodcast")}
          />
        </div>
        <Button
          width={"w-22"}
          text={loading ? "Loading..." : "Logout"}
          onClick={() => handleLogout()}
        />
      </div>
    </>
  );
};

export default ProfilePage;
