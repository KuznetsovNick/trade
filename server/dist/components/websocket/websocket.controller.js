"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketController = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const websocket_service_1 = require("./websocket.service");
const fs = require("fs");
let WebsocketController = class WebsocketController {
    constructor(service) {
        this.service = service;
        this.stocks_to_trade = [];
        this.init_data = [];
        this.stocks_file = JSON.parse(fs.readFileSync("./data/stocks.json").toString());
    }
    handleConnection(client) {
        if (this.stocks_to_trade.length)
            client.emit('message', { stocks: this.stocks_to_trade, data: this.init_data });
        else {
            client.emit('message', { finish: true });
        }
    }
    handleMessage(client, data) {
        if (data.close) {
            this.server.emit('message', { finish: true });
            this.stocks_to_trade = [];
            this.init_data = [];
            clearInterval(this.interval);
            return;
        }
        for (let i = 0; i < data.stocks.length; i++) {
            for (let j = 0; j < this.stocks_file.length; j++) {
                if (data.stocks[i] === this.stocks_file[j].file) {
                    this.stocks_to_trade.push(this.stocks_file[j].id);
                }
            }
        }
        const stocks = [];
        for (let i = 0; i < data.stocks.length; i++) {
            const file = `./data/stocks/${data.stocks[i]}`;
            stocks.push(JSON.parse(fs.readFileSync(file).toString()));
            this.init_data.push([]);
        }
        let cur;
        let start_index;
        for (let i = stocks[0].open.length - 1; i >= 0; i--) {
            cur = stocks[0].date[i];
            cur = cur[6] + cur[7] + cur[8] + cur[9] + "-" + cur[0] + cur[1] + "-" + cur[3] + cur[4];
            if (data.date == cur) {
                start_index = i;
                break;
            }
        }
        let body = [];
        this.interval = setInterval(() => {
            body = [];
            for (let i = 0; i < stocks.length; i++) {
                const cur = {
                    date: stocks[i].date[start_index],
                    open: stocks[i].open[start_index]
                };
                body.push(cur);
                this.init_data[i].push(cur);
            }
            start_index++;
            if (start_index == stocks[0].date.length) {
                clearInterval(this.interval);
            }
            this.server.emit('message', body);
        }, data.interval);
        return;
    }
};
exports.WebsocketController = WebsocketController;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketController.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], WebsocketController.prototype, "handleMessage", null);
exports.WebsocketController = WebsocketController = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [websocket_service_1.WebsocketService])
], WebsocketController);
//# sourceMappingURL=websocket.controller.js.map