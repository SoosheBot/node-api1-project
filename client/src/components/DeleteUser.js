import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const DeleteUser = props => {
  const handleDelete = e => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/api/users/${props.userlist.id}`)
      .then(res => {
        console.log("Delete success", res);
        window.location.reload(false);
      })
      .catch(err => console.log('Could not delete user', err));
  };

  return (
    <div className="edit-article-wrapper">
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteUser;
