import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import userMutation from "../data/userMutation";

export default function SignupForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: ""
  });
  const { username, password, name } = formData;
  const [createUser, { loading, error, data }] = useMutation(
    userMutation.CREATE_USER,
    {
      variables: formData
    }
  );

  useEffect(() => {
    if (data && data.createUser.success) {
      const token = data.createUser.data.token;
      const user = data.createUser.data.user;
      onSubmit({ ...user, token });
    }
  }, [error, data, onSubmit]);

  const handleOnSubmit = event => {
    event.preventDefault();
    createUser();
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
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
        {data && !data.createUser.success && data.createUser.message}
        {error && error.message}
      </div>
      <button type="submit">{loading ? "Loading!" : "Sign up"}</button>
    </form>
  );
}
