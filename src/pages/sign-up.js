import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useState, useContext, useEffect } from "react";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [fullName, setFullName] = useState("");

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container mx-auto flex h-screen max-w-screen-lg items-center justify-center">
      <div className="hidden max-w-[460px] md:flex md:w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="mx-auto flex w-full max-w-[430px] flex-col md:mx-0 md:w-2/5">
        <div className="mb-[10px] flex flex-col items-center rounded border border-gray-primary bg-white py-4">
          <h1 className="my-9 flex w-full justify-center">
            <img src="/images/logo.png" alt="Instagram" className="" />
          </h1>
          {error && (
            <p className="mx-10 mb-4 text-xs text-red-primary">{error}</p>
          )}
          <form
            onSubmit={handleSignup}
            method="POST"
            className="mx-10 text-[#262626]"
          >
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="mb-2 h-2 w-full rounded border border-gray-primary py-5 px-4 text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-lightBlue-primary focus:ring-offset-1"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="mb-2 h-2 w-full rounded border border-gray-primary py-5 px-4 text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-lightBlue-primary focus:ring-offset-1"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="mb-2 h-2 w-full rounded border border-gray-primary py-5 px-4 text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-lightBlue-primary focus:ring-offset-1"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="mb-[14px] h-2 w-full rounded border border-gray-primary py-5 px-4 text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-lightBlue-primary focus:ring-offset-1"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`mb-6 h-8 w-full rounded bg-lightBlue-primary font-bold text-white ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded border border-gray-primary bg-white p-4">
          <p className="text-sm">
            Have an account?{` `}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-lightBlue-primary"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
