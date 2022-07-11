import { io, Socket } from 'socket.io-client'
import { VacationModel } from '../Models/VacationModel';
import store from '../Redux/Store';
import { AddAction, DeleteAction, UpdateAction } from '../Redux/VacationState';

class SocketService {

    private socket: Socket;

    private listen(): void {

        this.socket.on('admin-added-vacation', (vacation: VacationModel) => {
            store.dispatch(AddAction(vacation));

        });

        this.socket.on('admin-updated-vacation', (vacation: VacationModel) => {
            store.dispatch(UpdateAction(vacation));
        });

        this.socket.on('admin-deleted-vacation', (id: number) => {
            store.dispatch(DeleteAction(id));
        });

    };

    public connect(): void {
        this.socket = io("http://localhost:3004")
        this.socket.emit('connection')
        this.listen()
    };

    public disconnect(): void {

        this.socket.disconnect();

    };

}
const socketService = new SocketService();
export default socketService;