import { io, Socket } from  'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_WS_URL;
let socket: Socket | null = null;


export const connectSocket = (userId: string) =>{
   console.log("SOCKET_URL",SOCKET_URL);

      if(!socket){
        socket = io(SOCKET_URL);

        socket.on("connect", ()=>{
            console.log('socket connection established', socket?.id)
            socket?.emit('register', userId);
        })
      
      }
return socket ;
}  

export const getSocket = () => socket;

export const disconnectSocket = ()=>{
   if(socket){
      socket.disconnect();
      console.log('socket disconnect')
      socket = null;  
   }
}