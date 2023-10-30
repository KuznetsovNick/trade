import { StockService } from './stock.service';
import { Response } from 'express';
export declare class StockController {
    private readonly service;
    constructor(service: StockService);
    getStocks(res: Response): void;
    getStockInfo(res: Response, body: any): void;
}
