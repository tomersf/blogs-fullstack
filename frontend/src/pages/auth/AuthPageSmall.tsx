import React, { useContext, useState } from "react";
import FormButton from "../../components/buttons/FormButton";
import ThemeContext from "../../context/theme";
import { MediaQuery } from "../../helpers/queriesSize";
import useMediaQuery from "../../hooks/useMediaQuery";
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
        <FormButton
          extraStyles=""
          handleOnClick={() => {
            setRegistering(!registering);
          }}
        >
          Switch to Login
        </FormButton>
      ) : (
        <FormButton
          extraStyles=""
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
  const isVerySmallScreen = useMediaQuery(MediaQuery.BelowVerySmallScreen);

  if (isVerySmallScreen) {
    return <div>Test</div>;
  }

  return (
    <div className="mt-5 flex h-fit flex-col justify-center">
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
