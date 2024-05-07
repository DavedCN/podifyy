import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.User);
  console.log(user);
  return (
    <>
      <div></div>
    </>
  );
};

export default ProfilePage;
