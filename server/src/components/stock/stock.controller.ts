import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import { StockService } from './stock.service';
import { Response} from 'express';

@Controller('/api/stocks')
export class StockController {
    constructor(private readonly service: StockService) {
    }

    @Get()
    getStocks(@Res() res: Response): void {
        res.json(this.service.getStockList());
    }

    @Post("/info")
    getStockInfo(@Res() res: Response, @Body() body: any): void {
        res.json(this.service.getStockInfo(body));
    }
}