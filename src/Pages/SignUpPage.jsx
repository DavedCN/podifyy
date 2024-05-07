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

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (
      password === confirmpassword &&
      password.length >= 6 &&
      fullname &&
      email
    ) {
      try {
        //CLEARING INPUT FIELDS

        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setLoading(true);

        //CREATING USER ACCOUNT
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        //SAVING USER DETAILS
        await setDoc(doc(db, "users", user.uid), {
          fullname: fullname,
          email: user.email,
          uid: user.uid,
        });

        //SAVE DATA IN REDUX AND CALL THE ACTION
        dispatch(
          setUser({
            fullname: fullname,
            email: user.email,
            uid: user.uid,
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

      <Button
        text={loading ? "Loading..." : "Sign Up"}
        disabled={loading}
        onClick={handleSignUp}
      />
    </>
  );
};

export default SignUp;
