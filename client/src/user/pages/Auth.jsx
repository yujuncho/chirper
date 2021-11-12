import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import authTypes from "../../shared/data/authTypes";

import { useNavigate } from "react-router";
import useAuth from "../../shared/hooks/useAuth";

import colors from "../../shared/data/colors";

const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex: 1;
`;

const LogoEnlarged = styled.div`
  flex: 0;

  @media (min-width: 768px) {
    flex: 1;
    background: ${colors.PRIMARY};
  }
`;

const AuthContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  min-width: 45vw;
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 576px) {
    width: initial;
  }
`;

const AuthFormContainer = styled.div`
  max-width: 100%;

  @media (min-width: 576px) {
    max-width: 400px;
  }
`;

const AuthSwitchContainer = styled.div`
  margin-bottom: 3rem;
`;

const AuthContent = styled.div`
  flex-shrink: 0;
  max-width: 760px;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;

  & > h1 {
    font-size: 2.5rem;
    font-weight: 900;
    margin: 2rem 0;
  }

  & > h2 {
    font-size: 1.5rem;
  }

  & > form {
    margin-bottom: 1rem;
  }

  & > ${AuthFormContainer} {
    margin-bottom: 2rem;
  }

  & > div > span {
    margin-left: 0.3rem;
    color: ${colors.PRIMARY};
    cursor: pointer;
  }

  @media (min-width: 576px) {
    padding: 10px;

    & > h1 {
      font-size: 3.5rem;
      font-weight: 900;
      margin: 2.5rem 0;
    }

    & > h2 {
      font-size: 2rem;
    }

    & > form {
      margin-bottom: 1rem;
    }

    & > ${AuthFormContainer} {
      margin-bottom: 2.5rem;
    }
  }

  @media (min-width: 768px) {
    padding: 20px;

    & > h1 {
      font-size: 4rem;
      font-weight: 900;
      margin: 3rem 0;
    }

    & > h2 {
      font-size: 2rem;
    }

    & > form {
      margin-bottom: 1rem;
    }

    & > ${AuthFormContainer} {
      margin-bottom: 3rem;
    }
  }
`;

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

  let primaryHeader = "Happening now";
  let secondaryHeader = "Join Chirper today";
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
    <AuthContainer>
      <LogoEnlarged />
      <AuthContentContainer>
        <AuthContent>
          <h1>{primaryHeader}</h1>
          <h2>{secondaryHeader}</h2>
          <AuthFormContainer>{form}</AuthFormContainer>
          <AuthSwitchContainer>
            {changeAuthTypeHelperText}
            <span onClick={handleChangeAuthType}>{changeAuthTypeBtnText}</span>
          </AuthSwitchContainer>
        </AuthContent>
      </AuthContentContainer>
    </AuthContainer>
  );
}
