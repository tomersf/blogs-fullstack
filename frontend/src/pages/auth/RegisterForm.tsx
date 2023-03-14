import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/buttons/FormButton";
import InputButton from "../../components/buttons/InputButton";
import Message from "../../components/Message";
import ThemeContext from "../../context/theme";
import { logAsGuest } from "../../reducers/userReducer";
import authService from "../../services/authService";
import { useStoreDispatch } from "../../store/hooks";

type Props = {};

const RegisterForm = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const theme = useContext(ThemeContext);
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const result = await authService.registerUser(username, password);
    if (result.success) {
      setMessage("Success! Please login.");
      return;
    }
    setMessage("Something went wrong!");
  };

  const handleGuestLogin = () => {
    dispatch(logAsGuest());
    navigate("/");
  };

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 2500);
  }
  return (
    <div className="w-full p-3">
      {message ? (
        <Message
          msg={message}
          extraStyles={`w-full h-12 flex items-center justify-center rounded-lg ${
            theme.isDark
              ? "bg-dark-theme text-primary-light"
              : "bg-secondary-dark text-primary-dark"
          }`}
        />
      ) : null}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <h2 className="form-title text-2xl font-bold leading-[2] text-[#181818]">
          Create Account
        </h2>
        <div className="w-3/4">
          <div className="flex w-full flex-col">
            <InputButton
              type="text"
              onChange={(e) => {}}
              value={""}
              placeholder="Username"
              extraStyles=""
              width="w-full"
            />
            <InputButton
              type="password"
              onChange={(e) => {}}
              value={""}
              placeholder="Password"
              width="w-full"
            />
          </div>
        </div>

        <FormButton extraStyles="mt-5 w-3/4" handleOnClick={handleRegister}>
          Register
        </FormButton>
        <FormButton extraStyles="mt-5 w-3/4" handleOnClick={handleGuestLogin}>
          Continue as Guest
        </FormButton>
      </form>
    </div>
  );
};

export default RegisterForm;
