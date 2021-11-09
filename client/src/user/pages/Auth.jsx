import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import authTypes from "../../shared/data/authTypes";

import { useNavigate } from "react-router";
import useAuth from "../../shared/hooks/useAuth";

export default function Auth() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { authContext } = useAuth();
  const [authType, setAuthType] = useState(
    state ? state.authType : authTypes.SIGNUP
  );
  let from = (state && state.from && state.from.pathname) || "/home";

  const handleOnSubmit = user => {
    authContext.signin(user);
    navigate(from, { replace: true, state: { authType: null } });
  };

  const handleChangeAuthType = event => {
    event.preventDefault();
    setAuthType(prevType => {
      if (prevType === authTypes.SIGNUP) {
        return authTypes.LOGIN;
      } else {
        return authTypes.SIGNUP;
      }
    });
  };

  let primaryHeader = "Happening in the future";
  let secondaryHeader = "Join Chirper tomorrow";
  let form = <SignupForm onSubmit={handleOnSubmit} />;
  let changeAuthTypeHelperText = "Already have an account?";
  let changeAuthTypeBtnText = "Sign in";

  if (authType === authTypes.LOGIN) {
    secondaryHeader = "Sign in to Chirper";
    form = <LoginForm onSubmit={handleOnSubmit} />;
    changeAuthTypeHelperText = "Don't have an account?";
    changeAuthTypeBtnText = "Sign up";
  }

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
