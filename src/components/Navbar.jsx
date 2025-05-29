import React from "react";
import { auth } from "../firebase";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>ChatApp</h1>
      <button
        onClick={() => auth.signOut()}
        className="btn-logout"
      >
        Logout
      </button>
    </nav>
  );
}
