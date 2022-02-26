import io from "socket.io-client";

export const socket = io('https://gsabackend.herokuapp.com', {
    autoConnect: false,
    transports: ['websocket']}
    
);

//https://gsabackend.herokuapp.com/graphql
//http://192.168.1.32:8080/graphql s=home
//http://10.15.85.21:8080/graphql library