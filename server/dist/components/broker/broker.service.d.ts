import { Broker } from '../../models/broker';
export declare class BrokersService {
    brokers: Broker[];
    id: number;
    constructor();
    readFile(brokersFile?: string): Broker[];
    update_brokers(): void;
    write_to_file(): void;
    deleteBroker(body: any): void;
    changeBalance(body: any): void;
    addBroker(body: any): void;
    getBroker(body: any): Broker;
    changeName(body: any): void;
    getPersonalStocks(body: any): {
        data: any[];
    };
    deal(body: any): {
        status: any;
        balance: string;
        qty: any;
        stock_balance: any;
    } | {
        status: any;
        balance?: undefined;
        qty?: undefined;
        stock_balance?: undefined;
    };
}
