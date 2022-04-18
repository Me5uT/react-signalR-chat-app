import React from "react";
import "./App.css";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Console } from "console";

const URL = "http://localhost:5000/chat";

export const App = () => {
  const [hubConnetion, setHubConnection] = React.useState<HubConnection>();
  const [text, setText] = React.useState<string>("");
  const [messageList, setMessageList] = React.useState<string[]>([]);

  React.useEffect(() => {
    createHubConnection();
  }, []);

  React.useEffect(() => {
    if (hubConnetion) {
      hubConnetion.on("ReceiveMessage", (message) => {
        setMessageList([...messageList, message]);
        console.log("message", message);
      });
    }
  }, [hubConnetion]);

  const createHubConnection = async () => {
    const hubConnection = new HubConnectionBuilder().withUrl(URL).build();

    try {
      await hubConnection.start();
      console.log("Bağlandı.");
    } catch (error) {
      console.log("hata:", error);
    }

    setHubConnection(hubConnection);
  };

  const sendMessage = async () => {
    if (hubConnetion) {
      await hubConnetion.invoke("SendMessage", text);
    }

    setMessageList((list) => [...list, text]);
  };

  return (
    <div className="App">
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <div className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                // id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={text}
            placeholder="..."
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
};
