import React from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


const  DeleteUser = (props) => {
  const handleDelete = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/api/users/${props.userlist.id}`)
      .then(res => {
        console.log('delete success', res);
        window.location.reload(false); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="edit-article-wrapper">
      <button className="md-button" onClick={handleDelete}>
        Delete User
      </button>
    </div>
  );
}

export default DeleteUser;
