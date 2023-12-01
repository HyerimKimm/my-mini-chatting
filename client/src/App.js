import styled from "styled-components";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect("http://localhost:4000");

function App() {
  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div>
      <InputWrap>
        <input />
        <button onClick={sendMessage}>Send</button>
      </InputWrap>
    </div>
  );
}

const InputWrap = styled.div``;

export default App;
