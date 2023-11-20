import { BrokersService } from './broker.service';
import { Response } from 'express';
export declare class BrokersController {
    private readonly service;
    constructor(service: BrokersService);
    getBrokers(res: Response): void;
    deleteBroker(res: Response, body: any): void;
    changeBalance(res: Response, body: any): void;
    changeName(res: Response, body: any): void;
    getPersonalStocks(res: Response, body: any): void;
    deal(res: Response, body: any): void;
    getBroker(res: Response, body: any): void;
    addBroker(res: Response, body: any): void;
}
