import { Dispatch, SetStateAction, useContext, useState } from "react";
import authService from "../services/auth";
import ActionButton from "./ActionButton";
import InputButton from "./InputButton";
import Message from "./Message";
import "../styles/auth.css";
import ColorTheme from "./ColorTheme";
import ThemeContext from "../context/theme";
import FormButton from "./FormButton";

type Props = {
  setUser: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
};

const AuthPage = ({ setUser, setToken }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [switchForm, setSwitchForm] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useContext(ThemeContext);

  const changeAuth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTimeout(function () {
      setSwitchForm((val) => !val);
    }, 1500);
    setMessage("");
    setUsername("");
    setPassword("");
    setIsRegistering((oldValue) => !oldValue);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setMessage("");
    let result;
    if (isRegistering) {
      result = await authService.registerUser(username, password);
      if (result.success) {
        setMessage("Success! Please login now.");
        return;
      }
    } else {
      result = await authService.loginUser(username, password);
      if (result.success) {
        setUser(result.data!.username);
        setToken(result.data!.token);
        return;
      }
    }
    setMessage("Something went wrong!");
  };

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mx-5 mt-3 flex w-full justify-around">
        <div className="">
          <ColorTheme />
        </div>
      </div>
      <div
        className={`${
          theme.isDark ? "bg-primary-light" : "bg-primary-dark"
        } main relative h-[600px] w-[1000px] overflow-hidden rounded-xl p-6`}
      >
        <div
          className={`${
            isRegistering ? "is-txl" : ""
          } absolute top-0 left-[calc(100%-600px)] z-[100] flex h-full w-[600px] items-center justify-center ${
            theme.isDark ? "bg-primary-light" : "bg-primary-dark"
          } p-6 duration-[1.25s]`}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`${
              isRegistering ? "is-txl is-hidden" : "show-register"
            } flex h-full w-full flex-col items-center justify-center`}
          >
            <h2 className="form-title text-3xl font-bold leading-[3] text-[#181818]">
              Create Account
            </h2>
            <div className="my-0 mx-1 w-[30px] object-contain opacity-50 duration-150 hover:cursor-pointer hover:opacity-100 hover:duration-150"></div>
            <input
              type="text"
              className="form-input font-Ubuntu my-1 mx-0 h-[40px] w-[350px] rounded-lg border-none bg-[#ecf0f3] pl-6 font-[sans-serif] text-sm tracking-[0.15px] outline-none duration-200 ease-in"
              placeholder="Username"
            />
            <input
              type="password"
              className="form-input font-Ubuntu my-1 mx-0 h-[40px] w-[350px] rounded-lg border-none bg-[#ecf0f3] pl-6 font-[sans-serif] text-sm tracking-[0.15px] outline-none duration-200 ease-in"
              placeholder="Password"
            />

            <FormButton extraStyles="mt-5" handleOnClick={() => {}}>
              Register
            </FormButton>
          </form>
        </div>

        <div
          className={`${
            isRegistering ? "is-txl is-z200" : ""
          } login-form absolute top-0 flex h-full w-[600px] items-center justify-center ${
            theme.isDark ? "bg-primary-light" : "bg-primary-dark"
          } p-6 duration-[1.25s]`}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`${
              isRegistering ? "" : "is-txl is-z200 is-hidden"
            } flex h-full w-full flex-col items-center justify-center`}
          >
            <h2 className="form-title text-3xl font-bold leading-[3] text-[#181818]">
              Sign in To Website
            </h2>
            <div className="my-0 mx-1 w-[30px] object-contain opacity-50 duration-150 hover:cursor-pointer hover:opacity-100 hover:duration-150"></div>
            <input
              type="text"
              className="form-input font-Ubuntu my-1 mx-0 h-[40px] w-[350px] rounded-lg border-none bg-[#ecf0f3] pl-6 font-[sans-serif] text-sm tracking-[0.15px] outline-none duration-200 ease-in"
              placeholder="Username"
            />
            <input
              type="password"
              className="form-input font-Ubuntu my-1 mx-0 h-[40px] w-[350px] rounded-lg border-none bg-[#ecf0f3] pl-6 font-[sans-serif] text-sm tracking-[0.15px] outline-none duration-200 ease-in"
              placeholder="Password"
            />
            <FormButton extraStyles="mt-5" handleOnClick={handleSubmit}>
              Login
            </FormButton>
          </form>
        </div>

        <div
          className={`${isRegistering ? "is-txr" : ""} ${
            switchForm ? "is-gx" : ""
          } switch`}
        >
          <div
            className={`${isRegistering ? "is-txr" : ""} switch-circle`}
          ></div>
          <div
            className={`${
              isRegistering ? "is-txr" : ""
            } switch-circle switch-circle-t`}
          ></div>
          <div className={`${isRegistering ? "is-hidden" : ""} switch-form`}>
            <h2 className="switch-title text-3xl font-bold leading-[3] text-[#181818]">
              Welcome Back !
            </h2>
            <p className="switch-description description">
              To keep connected with us please login with your personal info
            </p>
            <FormButton extraStyles="mt-5" handleOnClick={changeAuth}>
              Login
            </FormButton>
          </div>

          <div className={`${isRegistering ? "" : "is-hidden"} switch-form`}>
            <h2 className="switch-title text-3xl font-bold leading-[3] text-[#181818]">
              Hello There!
            </h2>
            <p className="switch-description description">
              Register in order to start exploring blogs
            </p>
            <FormButton extraStyles="mt-5" handleOnClick={changeAuth}>
              Register
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex h-auto items-center justify-center">
  //     <form className=" flex h-2/4 flex-col items-center justify-between gap-6 rounded-lg border-2 border-double border-emerald-600 p-3">
  //       {message && <Message msg={message} />}
  //       <h1>{isRegistering ? "Register Form" : "Login Form"}</h1>
  //       <div className="flex flex-col gap-7">
  //         <InputButton
  //           extraStyles="text-black"
  //           placeholder="Enter Username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //         <InputButton
  //           extraStyles="text-black"
  //           placeholder="Enter Password"
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>
  //       <div classNameNameNameName="flex flex-col gap-3">
  //         <ActionButton handleOnClick={changeAuth}>
  //           {isRegistering ? "Switch to Login" : "Switch to Register"}
  //         </ActionButton>
  //         <ActionButton handleOnClick={handleSubmit}>Submit</ActionButton>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default AuthPage;
