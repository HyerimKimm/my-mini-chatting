import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:4000");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      console.log("join room start");
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message: message, room: room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <InputWrap>
        <input
          type="text"
          placeholder="room number..."
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>join room</button>
      </InputWrap>
      <InputWrap>
        <input
          placeholder="Message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </InputWrap>
      <h1>Message : {messageReceived}</h1>
    </div>
  );
}

const InputWrap = styled.div``;

export default App;
