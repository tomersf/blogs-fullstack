import React from "react";
import FormButton from "../../components/buttons/FormButton";
import InputButton from "../../components/buttons/InputButton";

type Props = {};

const RegisterForm = (props: Props) => {
  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex h-full w-full flex-col items-center justify-center`}
      >
        <h2 className="form-title text-2xl font-bold leading-[2] text-[#181818]">
          Create Account
        </h2>
        <InputButton
          type="text"
          onChange={(e) => {}}
          value={""}
          placeholder="Username"
          extraStyles=""
        />
        <InputButton
          type="password"
          onChange={(e) => {}}
          value={""}
          placeholder="Password"
        />

        <FormButton extraStyles="mt-5" handleOnClick={() => {}}>
          Register
        </FormButton>
        <FormButton extraStyles="mt-5" handleOnClick={() => {}}>
          Continue as Guest
        </FormButton>
      </form>
    </div>
  );
};

export default RegisterForm;
