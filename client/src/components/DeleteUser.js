import React from "react";
import axios from 'axios';


function DeleteUser(props, id) {
  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/users/${props.id}`)
      .then(res => {
        // console.log('delete call is firing')
        console.log('the user array', res.data);
        // window.location.reload(false); 
        //there was a 500 error every time user tries to delete a file. this is a workaround.

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
