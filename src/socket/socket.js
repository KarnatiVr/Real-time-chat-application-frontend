import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");

let userId;

export const setUserId= (id)=>{
    userId=id
}

export const connect = () => {
        socket.on("connect", () => {
            console.log("socket_id =>", socket.id);
        });
}

export const disconnect=()=>{
    socket.disconnect()
}

