import React from "react";
// import logo from './logo.svg';

import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

import "./App.css";

function App() {
  return (
    <div>
      <h1>Users</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;

