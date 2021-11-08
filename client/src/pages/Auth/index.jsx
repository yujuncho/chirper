import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AUTH_TYPES = {
  SIGNUP: 0,
  LOGIN: 1
};

export default function Auth() {
  const [authType, setAuthType] = useState(AUTH_TYPES.SIGNUP);
  let primaryHeader = "Happening in the future";
  let secondaryHeader = "Join Chirper tomorrow";
  let form = <SignupForm />;
  let changeAuthTypeHelperText = "Already have an account?";
  let changeAuthTypeBtnText = "Sign in";

  if (authType === AUTH_TYPES.LOGIN) {
    secondaryHeader = "Sign in to Chirper";
    form = <LoginForm />;
    changeAuthTypeHelperText = "Don't have an account?";
    changeAuthTypeBtnText = "Sign up";
  }

  const handleChangeAuthType = event => {
    event.preventDefault();
    setAuthType(prevType => {
      if (prevType === AUTH_TYPES.SIGNUP) {
        return AUTH_TYPES.LOGIN;
      } else {
        return AUTH_TYPES.SIGNUP;
      }
    });
  };

  return (
    <div>
      <h1>{primaryHeader}</h1>
      <h2>{secondaryHeader}</h2>
      {form}
      <div>
        {changeAuthTypeHelperText}
        <span onClick={handleChangeAuthType}>{changeAuthTypeBtnText}</span>
      </div>
    </div>
  );
}
