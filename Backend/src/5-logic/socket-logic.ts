import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import VacationModel from '../4-models/vacation-model';

let socketServer: SocketServer;

function listen(httpServer: HttpServer): void {


    socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });

    // Start listening while the user is connecting
    socketServer.sockets.on('connection', (socket: Socket) => {

        console.log("Client has been connected");

        // Stop listening - user disconnected
        socket.on('disconnect', () => {
            console.log('user has been disconnected');
        })

    })

}

function adminAddVacation(vacation: VacationModel): void {

    // Sending the added vacation for all users
    socketServer.sockets.emit('admin-added-vacation', vacation)

}

function adminUpdateVacation(vacation: VacationModel): void {

    // Updating vacation for all users
    socketServer.sockets.emit('admin-updated-vacation', vacation)

}

function adminDeleteVacation(id: number): void {

    // Delete vacation for all users
    socketServer.sockets.emit('admin-deleted-vacation', id)

}

export default {
    listen,
    adminAddVacation,
    adminUpdateVacation,
    adminDeleteVacation
}