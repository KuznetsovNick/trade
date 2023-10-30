import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BrokersController} from "./components/broker/broker.controller";
import {BrokersService} from "./components/broker/broker.service";
import {StockController} from "./components/stock/stock.controller";
import {StockService} from "./components/stock/stock.service";
import {WebsocketController} from "./components/websocket/websocket.controller";
import {WebsocketService} from "./components/websocket/websocket.service";

@Module({
  imports: [],
  controllers: [AppController, BrokersController, StockController],
  providers: [AppService, BrokersService, StockService, WebsocketController, WebsocketService]
})
export class AppModule {}
