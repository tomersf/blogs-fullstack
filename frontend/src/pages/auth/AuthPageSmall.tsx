import React, { useContext, useState } from "react";
import FormButton from "../../components/buttons/FormButton";
import ThemeContext from "../../context/theme";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../../styles/auth.css";

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
    <div className="flex w-full justify-center">
      {registering ? (
        <FormButton
          extraStyles="w-3/4"
          handleOnClick={() => {
            setRegistering(!registering);
          }}
        >
          Switch to Login
        </FormButton>
      ) : (
        <FormButton
          extraStyles="w-3/4"
          handleOnClick={() => {
            setRegistering(!registering);
          }}
        >
          Switch to Register
        </FormButton>
      )}
    </div>
  );
};

const AuthPageSmall = (props: Props) => {
  const [registering, setRegistering] = useState(true);
  const theme = useContext(ThemeContext);

  return (
    <div className="mt-5 flex h-fit flex-col justify-center shadow-lg">
      <div
        className={`${
          theme.isDark ? "bg-primary-light" : "bg-primary-dark"
        }  rounded-xl `}
      >
        {registering ? <RegisterForm /> : <LoginForm />}
        <div className="m-5 flex justify-center">
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
