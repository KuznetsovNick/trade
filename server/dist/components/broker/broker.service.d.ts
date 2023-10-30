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
}
