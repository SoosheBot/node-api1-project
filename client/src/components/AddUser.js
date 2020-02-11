import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddUser = () => {
  const [addUser, setAddUser] = useState({
    name: "",
    bio: ""
  });

  const handleChange = e => {
    setAddUser({ ...addUser, [e.target.name]: e.target.value });
    console.log("handleChange firing");
  };

  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/users", addUser)
      .then(res => {
        console.log("Add user success", res.data);
        setAddUser({
          ...addUser,
          name: "",
          bio: ""
        });
      })
      .catch(err => console.log("Could not add user", err));
  };

  return (
    <div className="add-user-form" data-testid='add-user-form'>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          value={addUser.name}
          placeholder="add name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          value={addUser.bio}
          placeholder="add bio"
          onChange={handleChange}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
export default AddUser;
