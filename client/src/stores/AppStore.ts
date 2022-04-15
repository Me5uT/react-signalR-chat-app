import { makeAutoObservable } from "mobx";
import * as io from "socket.io-client";

export class AppStore {
  private static PORT = "http://localhost:3001";

  constructor() {
    makeAutoObservable(this);
  }

  userName: string = "";
  room: string = "";
  showChat: boolean = false;
  socket: io.Socket = io.connect(AppStore.PORT);

  setUsername = (userName: string) => {
    this.userName = userName;
  };

  setRoom = (room: string) => {
    this.room = room;
  };

  showOrDisplayChat = (display: boolean) => {
    this.showChat = display;
  };

  joinRoom = () => {
    if (this.userName !== "" && this.room !== "") {
      this.socket.emit("join_room", this.room);
      this.showOrDisplayChat(true);
    }
  };
}
