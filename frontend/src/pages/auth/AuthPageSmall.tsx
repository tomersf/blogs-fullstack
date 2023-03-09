import React, { useContext, useState } from "react";
import ActionButton from "../../components/buttons/ActionButton";
import ThemeContext from "../../context/theme";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {};

type AuthOptionsProps = {
  registering: boolean;
  setRegistering: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthOptions = ({
  registering,
  setRegistering,
}: AuthOptionsProps): JSX.Element => {
  return (
    <div>
      {registering ? (
        <ActionButton
          extraStyles=""
          handleOnClick={() => {
            setRegistering(!registering);
          }}
        >
          Switch to Login
        </ActionButton>
      ) : (
        <ActionButton
          extraStyles=""
          handleOnClick={() => {
            setRegistering(!registering);
          }}
        >
          Switch to Register
        </ActionButton>
      )}
    </div>
  );
};

const AuthPageSmall = (props: Props) => {
  const [registering, setRegistering] = useState(true);
  const theme = useContext(ThemeContext);
  return (
    <div className="mt-5 flex h-fit flex-col items-center">
      <div
        className={`${
          theme.isDark ? "bg-primary-light" : "bg-primary-dark"
        }  rounded-xl p-6`}
      >
        {registering ? <RegisterForm /> : <LoginForm />}
        <div className="mt-5">
          <AuthOptions
            registering={registering}
            setRegistering={setRegistering}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPageSmall;
