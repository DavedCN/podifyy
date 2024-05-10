import InputComponent from "../components/Common/input/input";
import Button from "../components/Common/Button/Button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../components/Input/FileInput";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profilePictureHandler = (file) => {
    setProfilePic(file);
  };

  const handleSignUp = async () => {
    if (
      password === confirmpassword &&
      password.length >= 6 &&
      fullname &&
      email &&
      profilePic
    ) {
      try {
        //CLEARING INPUT FIELDS

        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfilePic(null);

        setLoading(true);

        //CREATING USER ACCOUNT
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        const storage = getStorage();
        const fileRef = ref(storage, "profilePictures/" + user.uid);

        //UPLOADING PROFILE PICTURE
        await uploadBytes(fileRef, profilePic);
        const profilePicUrl = await getDownloadURL(fileRef);

        //SAVING USER DETAILS
        await setDoc(doc(db, "users", user.uid), {
          fullname: fullname,
          email: user.email,
          uid: user.uid,
          profilePic: profilePicUrl,
        });

        //SAVE DATA IN REDUX AND CALL THE ACTION
        dispatch(
          setUser({
            fullname: fullname,
            email: user.email,
            uid: user.uid,
            profilePic: profilePicUrl,
          })
        );

        toast.success("Account created successfully");

        navigate("/profile");
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      }
    } else {
      if (password !== confirmpassword) {
        toast.error("Passwords do not match");
      } else if (password.length < 6) {
        toast.error("Password must be atleast 6 characters long");
      }

      setLoading(false);
    }
  };
  return (
    <>
      <InputComponent
        state={fullname}
        setState={setFullname}
        type="text"
        placeholder="Full Name"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        type="email"
        placeholder="Email"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        type="password"
        placeholder="Password"
        required={true}
      />

      <InputComponent
        state={confirmpassword}
        setState={setConfirmPassword}
        type="password"
        placeholder="Confirm Password"
        required={true}
      />

      <FileInput
        accept="image/*"
        id="profile-picture"
        fileHandlenc={profilePictureHandler}
        text="Profile Picture"
      />

      <Button
        text={loading ? "Loading..." : "Sign Up"}
        disabled={loading}
        onClick={handleSignUp}
      />
    </>
  );
};

export default SignUp;
