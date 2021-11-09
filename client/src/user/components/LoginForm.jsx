import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import userMutation from "../data/userMutation";

export default function LoginForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = formData;
  const [loginUser, { loading, error, data }] = useMutation(
    userMutation.LOGIN_USER,
    {
      variables: formData
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
    setFormData(prevState => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
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
