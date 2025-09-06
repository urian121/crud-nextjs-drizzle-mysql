"use client";

import { useState } from "react";
import UserForm from "./components/users/UserForm";
import UserList from "./components/users/UserList";
import Navbar from "./components/Navbar";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  const clearSelection = () => setSelectedUser(null);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <UserForm selectedUser={selectedUser} clearSelection={clearSelection} />
          <UserList onEdit={setSelectedUser} />
        </div>
      </div>
    </>
  );
}
