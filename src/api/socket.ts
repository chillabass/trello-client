import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants/server";

export const socket = io(BASE_URL, {
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`,
  },
});