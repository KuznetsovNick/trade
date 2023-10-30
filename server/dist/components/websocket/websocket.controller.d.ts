import { Server, Socket } from 'socket.io';
import { WebsocketService } from "./websocket.service";
export declare class WebsocketController {
    private readonly service;
    interval: any;
    constructor(service: WebsocketService);
    server: Server;
    handleMessage(client: Socket, data: any): void;
}
