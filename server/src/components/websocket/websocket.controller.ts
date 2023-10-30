import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {WebsocketService} from "./websocket.service";
import * as fs from 'fs'

@WebSocketGateway({cors: true})
export class WebsocketController{
    interval
    constructor(private readonly service: WebsocketService){
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: Socket, data: any) {
        if(data.close){
            clearInterval(this.interval)
            return
        }
        const stocks = []
        for(let i = 0; i < data.stocks.length; i++){
            const file = `./data/stocks/${data.stocks[i]}`
            stocks.push(JSON.parse(fs.readFileSync(file).toString()));
        }

        let cur
        let start_index

        for(let i = stocks[0].open.length - 1; i >= 0; i--){
            cur = stocks[0].date[i]
            cur = cur[6]+cur[7]+cur[8]+cur[9]+"-"+cur[0]+cur[1]+"-"+cur[3]+cur[4]
            if(data.date == cur) {
                start_index = i
                break
            }
        }

        let body = []

        this.interval = setInterval(() => {
            body = []
            for(let i = 0; i < stocks.length; i++){
                body.push({
                    date: stocks[i].date[start_index],
                    open: stocks[i].open[start_index]
                })
            }
            start_index++
            if(start_index == stocks[0].date.length){
                clearInterval(this.interval)
            }
            this.server.emit('message', body)
        }, data.interval)
    }
}