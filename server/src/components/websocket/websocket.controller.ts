import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {WebsocketService} from "./websocket.service";
import * as console from "console";
import * as fs from "fs";

@WebSocketGateway({cors: true})
export class WebsocketController implements OnGatewayConnection{
    interval
    stocks_to_trade = []
    init_data = []
    stocks_file = JSON.parse(fs.readFileSync("./data/stocks.json").toString())
    constructor(private readonly service: WebsocketService){
    }

    handleConnection(client: any): any {
        if(this.stocks_to_trade.length)
            client.emit('message', {stocks: this.stocks_to_trade, data: this.init_data});
        else{
            client.emit('message', {finish: true});
        }
    }

    @WebSocketServer()
    server: Server;


    @SubscribeMessage('message')
    handleMessage(client: Socket, data: any) {
        if(data.close){
            this.server.emit('message', {finish: true})
            this.stocks_to_trade = []
            this.init_data = []
            clearInterval(this.interval)
            return
        }
        for(let i = 0; i < data.stocks.length; i++){
            for(let j = 0; j < this.stocks_file.length; j++){
                if(data.stocks[i] === this.stocks_file[j].file){
                    this.stocks_to_trade.push(this.stocks_file[j].id)
                }
            }
        }
        const stocks = []
        for(let i = 0; i < data.stocks.length; i++){
            const file = `./data/stocks/${data.stocks[i]}`
            stocks.push(JSON.parse(fs.readFileSync(file).toString()));
            this.init_data.push([])
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
                const cur = {
                    date: stocks[i].date[start_index],
                    open: stocks[i].open[start_index]
                }
                body.push(cur)
                this.init_data[i].push(cur)
            }
            start_index++
            if(start_index == stocks[0].date.length){
                clearInterval(this.interval)
            }
            this.server.emit('message', body)
        }, data.interval)
        return;
    }
}