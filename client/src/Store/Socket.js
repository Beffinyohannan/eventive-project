import {createContext} from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_SOCKET,{path: '/socket/socket.io'})
export const SocketContext = createContext();