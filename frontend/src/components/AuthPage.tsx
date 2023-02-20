import { Dispatch, SetStateAction, useContext, useState } from "react";
import authService from "../services/authService";
import InputButton from "./InputButton";
import Message from "./Message";
import "../styles/auth.css";
import ThemeContext from "../context/theme";
import FormButton from "./FormButton";

type Props = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthPage = ({ setLoggedIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [switchForm, setSwitchForm] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useContext(ThemeContext);

  const changeAuth = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        setMessage("Success! Please login.");
        return;
      }
    } else {
      result = await authService.loginUser(username, password);
      if (result.success) {
        setLoggedIn(true);
        return;
      }
    }
    setMessage("Something went wrong!");
  };

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  return (
    <div className="flex h-fit flex-col items-center justify-center">
      <div
        className={`${
          theme.isDark ? "bg-primary-light" : "bg-primary-dark"
        } main relative h-[600px] w-[1000px] overflow-hidden rounded-xl p-6`}
      >
        <div
          className={`${
            isRegistering ? "" : "is-txl"
          } absolute top-0 left-[calc(100%-600px)] z-[100] flex h-full w-[600px] items-center justify-center ${
            theme.isDark ? "bg-primary-light" : "bg-primary-dark"
          } p-6 duration-[1.25s]`}
        >
          <div className={message ? "show-error" : ""}>
            {isRegistering && message ? (
              <Message
                msg={message}
                extraStyles={`absolute top-0 left-0 w-full h-12 flex items-center justify-center ${
                  theme.isDark
                    ? "bg-dark-theme text-primary-light"
                    : "bg-secondary-dark text-primary-dark"
                }`}
              />
            ) : null}
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`${
              isRegistering ? "show-register" : "is-txl is-hidden"
            } flex h-full w-full flex-col items-center justify-center`}
          >
            <h2 className="form-title text-3xl font-bold leading-[3] text-[#181818]">
              Create Account
            </h2>
            <div className="my-0 mx-1 w-[30px] object-contain opacity-50 duration-150 hover:cursor-pointer hover:opacity-100 hover:duration-150"></div>
            <InputButton
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />
            <InputButton
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />

            <FormButton extraStyles="mt-5" handleOnClick={handleSubmit}>
              Register
            </FormButton>
          </form>
        </div>

        <div
          className={`${
            isRegistering ? "" : "is-txl is-z200"
          } login-form absolute top-0 flex h-full w-[600px] items-center justify-center ${
            theme.isDark ? "bg-primary-light" : "bg-primary-dark"
          } p-6 duration-[1.25s]`}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`${
              isRegistering ? "is-txl is-z200 is-hidden" : ""
            } flex h-full w-full flex-col items-center justify-center`}
          >
            <div className={message ? "show-error" : ""}>
              {!isRegistering && message ? (
                <Message
                  msg={message}
                  extraStyles={`absolute top-0 left-0 w-full h-12 flex items-center justify-center ${
                    theme.isDark
                      ? "bg-dark-theme text-primary-light"
                      : "bg-secondary-dark text-primary-dark"
                  }`}
                />
              ) : null}
            </div>
            <h2 className="form-title text-3xl font-bold leading-[3] text-[#181818]">
              Sign in To Website
            </h2>
            <div className="my-0 mx-1 w-[30px] object-contain opacity-50 duration-150 hover:cursor-pointer hover:opacity-100 hover:duration-150"></div>
            <InputButton
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />
            <InputButton
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <FormButton extraStyles="mt-5" handleOnClick={handleSubmit}>
              Login
            </FormButton>
          </form>
        </div>

        <div
          className={`${isRegistering ? "" : "is-txr"} ${
            switchForm ? "" : "is-gx"
          } switch`}
        >
          <div
            className={`${isRegistering ? "" : "is-txr"} switch-circle`}
          ></div>
          <div
            className={`${
              isRegistering ? "" : "is-txr"
            } switch-circle switch-circle-t`}
          ></div>
          <div className={`${isRegistering ? "" : "is-hidden"} switch-form`}>
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

          <div className={`${isRegistering ? "is-hidden" : ""} switch-form`}>
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
};

export default AuthPage;
