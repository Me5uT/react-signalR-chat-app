import { observer } from "mobx-react";
import React from "react";
import "./App.css";
import { Chat } from "./Chat";
import { AppStore } from "./stores/AppStore";

export const App = observer(() => {
  const store = React.useMemo(() => new AppStore(), []);

  const { socket, room, userName, showChat, setUsername, setRoom, joinRoom } =
    store;

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your name ..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID ..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  );
});
