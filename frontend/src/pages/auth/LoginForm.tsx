import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/buttons/FormButton";
import InputButton from "../../components/buttons/InputButton";
import Message from "../../components/Message";
import ThemeContext from "../../context/theme";
import { logIn } from "../../reducers/userReducer";
import authService from "../../services/authService";
import { useStoreDispatch } from "../../store/hooks";

type Props = {};

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const handleSubmit = async () => {
    const result = await authService.loginUser(username, password);
    if (result.success) {
      dispatch(logIn(username));
      navigate("/");
      return;
    }
    setMessage("Something went wrong!");
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
          Login
        </h2>
        <div className="w-3/4">
          <div className="flex w-full flex-col">
            <InputButton
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              placeholder="Username"
              extraStyles=""
              width="w-full"
            />
            <InputButton
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="Password"
              width="w-full"
            />
          </div>
        </div>

        <FormButton extraStyles="mt-5 w-3/4" handleOnClick={handleSubmit}>
          Sign In
        </FormButton>
      </form>
    </div>
  );
};

export default LoginForm;
