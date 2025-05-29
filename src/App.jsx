import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/Auth";
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsub();
  }, []);

  if (!user) {
    return <Auth onLogin={() => {}} />;
  }

  return (
    <div>
      <Navbar />
      <ChatRoom />
    </div>
  );
}

export default App;
