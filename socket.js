import io from "socket.io-client";

export const socket = io('https://gsabackend.herokuapp.com/graphql', {
    autoConnect: false,
    transports: ['websocket']}
    
    );