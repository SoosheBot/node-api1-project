import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const UserList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    axiosWithAuth()
      .get("/api/users")
      .then(res => {
        console.log("UserList response", res);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("Could not retrieve users", err);
      });
  }, []);

  return (
    <div className="user-list" user-id="user-list">
      <h1>Users</h1>
      {users &&
        users.map(user => {
          return (
            <div key={user.id} user={user}>
              <h2>Name: {user.name}</h2>
              <h2>Bio: {user.bio}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
