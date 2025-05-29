import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const dummy = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMsg.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMsg,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    setNewMsg("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatroom-container">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.uid === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            <p>{msg.text}</p>
<span>
  {msg.email} •{" "}
  {msg.createdAt?.toDate
    ? msg.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Sending..."}
</span>

          </div>
        ))}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} className="form-chat">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="input-chat"
        />
        <button type="submit" className="btn-send">
          Send
        </button>
      </form>
    </div>
  );
}
