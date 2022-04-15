import React from "react";
import "./App.css";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

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
  };

  return (
    <div className="App">
      <header className="App-header">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
        <div>
          <h2>Mesaj List</h2>
          <ul>
            {messageList.map((message: string, index: number) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      </header>
    </div>
  );
};
