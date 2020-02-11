import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialValue = {
  name: "",
  bio: ""
};

const EditUser = props => {
  const [editUser, setEditUser] = useState(initialValue);

  const handleChange = ev => {
    ev.persist();
    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
  };

  const submitForm = e => {
      e.preventDefault();
      axiosWithAuth()
      .put(`api/users/${props.userlist.id}`, editUser)
      .then(res => {
          console.log('updated user', res.data);
          window.location.reload(false);
      })
      .catch(err => {
          console.log("Could not update user", err);
      });
  };

  return (
    <div className="edit-user-form">
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          value={editUser.name}
          placeholder="edit name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          value={editUser.bio}
          placeholder="edit bio"
          onChange={handleChange}
        />
        <button type="submit" className="edit-button">
          Submit Edits
        </button>
      </form>
    </div>
  );
};

export default EditUser;
