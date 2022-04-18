import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React from "react";
import "./App.css";
import { Chat } from "./Chat";

const URL = "http://localhost:5000/chat";

export const App = () => {
  const [hubConnection, setHubConnection] = React.useState<HubConnection>();

  const [showChat, setShowChat] = React.useState<boolean>(false);
  const [room, setRoom] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");

  // React.useEffect(() => {
  //   createHubConnection();
  // }, []);

  // React.useEffect(() => {
  //   if (hubConnection) {
  //     hubConnection.on("ReceiveMessage", (author, message) => {
  //       setMessageList([...messageList, message]);
  //       console.log("message", message);
  //     });
  //   }
  // }, [hubConnection]);

  const createHubConnection = async () => {
    const hubConnection = new HubConnectionBuilder().withUrl(URL).build();

    try {
      await hubConnection.start();
      console.log(userName, " bağlandı.");
    } catch (error) {
      console.log("hata:", error);
    }

    setHubConnection(hubConnection);
  };

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      // socket.emit("join_room", room);
      createHubConnection();
      setShowChat(true);
    }

    // setMessageList((list) => [...list, text]);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your name ..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID ..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat hubConnection={hubConnection} username={userName} room={room} />
      )}
    </div>
  );
};
