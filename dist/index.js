import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            console.log("user joined room " + parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");
            // const currentUserRoom = allSockets.find((x) => x.socket == socket).room
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                // @ts-ignore
                if (allSockets[i].socket == socket) {
                    // @ts-ignore
                    currentUserRoom = allSockets[i].room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                // @ts-ignore
                if (allSockets[i].room == currentUserRoom) {
                    // @ts-ignore
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
//# sourceMappingURL=index.js.map