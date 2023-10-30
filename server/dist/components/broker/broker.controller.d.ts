import { BrokersService } from './broker.service';
import { Response } from 'express';
export declare class BrokersController {
    private readonly service;
    constructor(service: BrokersService);
    getBrokers(res: Response): void;
    deleteBroker(res: Response, body: any): void;
    changeBalance(res: Response, body: any): void;
    addBroker(res: Response, body: any): void;
}
