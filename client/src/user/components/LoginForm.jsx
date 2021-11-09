import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import useUser from "../../shared/hooks/useUser";

export default function LoginForm(props) {
  const { onSubmit } = props;
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

  useEffect(() => {
    if (data && data.loginUser.success) {
      const token = data.loginUser.data.token;
      const user = data.loginUser.data.user;
      onSubmit({ ...user, token });
    }
  }, [error, data, onSubmit]);

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
      <div>
        {data && !data.loginUser.success && data.loginUser.message}
        {error && error.message}
      </div>
      <button type="submit">{loading ? "Loading!" : "Sign in"}</button>
    </form>
  );
}
