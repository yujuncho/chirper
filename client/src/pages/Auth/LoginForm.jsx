import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });
  const { username, password } = formState;
  const User = useUser();
  const [loginUser, { loading, error, data }] = useMutation(
    User.mutation.LOGIN_USER,
    {
      variables: { username, password }
    }
  );
  const navigate = useNavigate();
  const { authContext } = useAuth();

  useEffect(() => {
    console.log(data);
    if (data && data.success && authContext.user === null) {
      const token = data.loginUser.data.token;
      const user = data.loginUser.data.user;
      console.log(token, user);
      authContext.signin({ ...user, token });
      navigate("/home");
    }
  }, [error, data, authContext, navigate]);

  const handleOnSubmit = event => {
    event.preventDefault();
    loginUser();
  };

  const handleInputChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    setFormState(prevState => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  if (loading) {
    return <div>Loading!</div>;
  }

  if (error) {
    return <div>error.message</div>;
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}
