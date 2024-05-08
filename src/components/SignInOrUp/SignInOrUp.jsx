import { useState } from "react";
import SignUp from "../../Pages/SignUpPage";
import LogIn from "../../Pages/LogInPage";

const SignInOrUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col  mt-16">
        <h1 className="text-2xl text-center font-semibold mb-8 ">
          {!flag ? "Sign Up " : "Log In"}
        </h1>
        {!flag ? <SignUp /> : <LogIn />}
        <p className="text-sm cursor-pointer" onClick={() => setFlag(!flag)}>
          {!flag ? "Have an account?" : "Dont have an account?"}
          <span className="hover:text-purple-grey">
            {" "}
            {!flag ? " Click here to Login." : " Click here to Sign Up."}
          </span>
        </p>
      </div>
    </>
  );
};

export default SignInOrUp;
