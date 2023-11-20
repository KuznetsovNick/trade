import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from "./websocket.service";
export declare class WebsocketController implements OnGatewayConnection {
    private readonly service;
    interval: any;
    stocks_to_trade: any[];
    init_data: any[];
    stocks_file: any;
    constructor(service: WebsocketService);
    handleConnection(client: any): any;
    server: Server;
    handleMessage(client: Socket, data: any): void;
}
