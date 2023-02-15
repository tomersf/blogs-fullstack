import { Dispatch, SetStateAction, useState } from "react";
import authService from "../services/auth";
import ActionButton from "./ActionButton";
import InputButton from "./InputButton";
import Message from "./Message";

type Props = {
  setUser: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
};

const AuthForm = ({ setUser, setToken }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [message, setMessage] = useState("");

  const changeAuth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMessage("");
    e.preventDefault();
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
    <div className="flex h-auto items-center justify-center">
      <form className=" flex h-2/4 flex-col items-center justify-between gap-6 rounded-lg border-2 border-double border-emerald-600 p-3">
        {message && <Message msg={message} />}
        <h1>{isRegistering ? "Register Form" : "Login Form"}</h1>
        <div className="flex flex-col gap-7">
          <InputButton
            extraStyles="text-black"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputButton
            extraStyles="text-black"
            placeholder="Enter Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton handleOnClick={changeAuth}>
            {isRegistering ? "Switch to Login" : "Switch to Register"}
          </ActionButton>
          <ActionButton handleOnClick={handleSubmit}>Submit</ActionButton>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
