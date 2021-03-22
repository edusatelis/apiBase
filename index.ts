import { Server } from "./server/server";
import { userRouter } from "./users/user.router";

const server = new Server();
server.bootstrap([userRouter]).then(server=>{
    console.log('Server is listening on:', server.app.address());
}).catch(err =>{
    console.log('Server failed to start');
    console.error(err);
    process.exit(1)
})