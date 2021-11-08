import { useState } from "react";
import { useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    name: ""
  });
  const { username, password, name } = formState;
  const User = useUser();
  const [createUser, { loading, error }] = useMutation(
    User.mutation.CREATE_USER,
    {
      variables: { username, password, name }
    }
  );

  const handleOnSubmit = event => {
    event.preventDefault();
    // createUser();
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
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
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
      <button type="submit">Sign up</button>
    </form>
  );
}
