import React from 'react';
import { render } from '@testing-library/react';
import AddUser from "./components/AddUser"
import DeleteUser from "./components/DeleteUser";
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('add user form renders', () => {
  const {getByTestId} = render(<AddUser />)
  getByTestId("add-user-form");
});

// test("delete button fires", () => {

// });