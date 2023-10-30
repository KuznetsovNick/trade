import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const stocks_file = "./data/stocks.json"

@Injectable()
export class StockService {
    getStockList(): any {
        return JSON.parse(fs.readFileSync(stocks_file).toString());
    }

    getStockInfo(body: any):any {
        const file = `./data/stocks/${body.file}`
        return JSON.parse(fs.readFileSync(file).toString());
    }

    openSockets(body: any){
        console.log(body)
    }
}