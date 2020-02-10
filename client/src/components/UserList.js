import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import DeleteUser from "./DeleteUser";

const UserList = () => {
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    axiosWithAuth()
      .get("/api/users")
      .then(res => {
        console.log("UserList res.data =", res.data);
        setUsersList(res.data);
      })
      .catch(err => {
        console.log("Could not retrieve users", err);
      });
  }, []);

  return (
    <div className="user-list" user-id="user-list">
      {usersList &&
        usersList.map(userlist => {
          return (
            <div key={userlist.id} userlist={userlist}>
              <h2>Name: {userlist.name}</h2>
              <h2>Bio: {userlist.bio}</h2>
              <DeleteUser userlist={userlist} />
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
