import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import userMutation from "../data/userMutation";

import Input from "../../shared/components/ui/Input";
import FormControl from "../../shared/components/ui/FormControl";
import FormActions from "../../shared/components/ui/FormActions";
import HiddenElement from "../../shared/components/ui/HiddenElement";
import Button from "../../shared/components/ui/Button";

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
      <FormControl>
        <HiddenElement>
          <label htmlFor="name">Name</label>
        </HiddenElement>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl>
        <HiddenElement>
          <label htmlFor="username">Username</label>
        </HiddenElement>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl>
        <HiddenElement>
          <label htmlFor="password">Password</label>
        </HiddenElement>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormActions>
        <div>
          {data && !data.createUser.success && data.createUser.message}
          {error && error.message}
        </div>
        <Button type="submit">{loading ? "Loading!" : "Sign up"}</Button>
      </FormActions>
    </form>
  );
}
