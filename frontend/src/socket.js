// frontend/src/socket.js
import { io } from "socket.io-client";
const socket = io("https://cp-battle-backend.onrender.com");
// const socket = io("http://localhost:5000"); // Replace with your backend URL
export default socket;
