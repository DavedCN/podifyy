import InputComponent from "../components/Common/input/input";
import Button from "../components/Common/Button/Button";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    if (password.length >= 6 && email) {
      try {
        // CLEARING INPUT FIELDS
        setPassword("");
        setEmail("");

        setLoading(true);

        //CREATING USER ACCOUNT
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        console.log(userData);

        //SAVE DATA IN REDUX AND CALL THE ACTION
        dispatch(
          setUser({
            fullname: userData.fullname,
            email: user.email,
            uid: user.uid,
            profilePic: user.profilePic,
          })
        );

        toast.success(`Welcome back, ${userData.fullname.split(" ")[0]}.`);
        navigate("/profile");
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      }
    } else {
      if (email === "") {
        toast.error("Email is required");
      } else if (password.length < 6) {
        toast.error("Password must be atleast 6 characters long");
      }
    }

    setLoading(false);
  };
  return (
    <>
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

      <Button
        text={loading ? "Loading..." : "Log In"}
        disabled={loading}
        onClick={handleLogIn}
      />
    </>
  );
};

export default LogIn;
