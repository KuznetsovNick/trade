import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Broker } from '../../models/broker';

const brokers_file = './data/brokers.json';

@Injectable()
export class BrokersService {
    brokers:Broker[]
    id: number
    constructor() {
        this.update_brokers()
        this.id = -1
        for(let i = 0; i < this.brokers.length; i++){
            if(this.brokers[i].id >= this.id){
                this.id = this.brokers[i].id + 1
            }
        }
    }
    readFile(brokersFile = brokers_file): Broker[] {
        return JSON.parse(fs.readFileSync(brokersFile).toString());
    }

    update_brokers(){
        this.brokers = JSON.parse(fs.readFileSync(brokers_file).toString())
    }
    write_to_file(){
        fs.writeFileSync(brokers_file, JSON.stringify(this.brokers))
    }

    deleteBroker(body: any){
        this.update_brokers()
        for(let i = 0; i < this.brokers.length; i++){
            if(this.brokers[i].id == body.id){
                this.brokers.splice(i, 1)
                break
            }
        }
        this.write_to_file()
    }

    changeBalance(body: any){
        this.update_brokers()
        for(let i = 0; i < this.brokers.length; i++){
            if(this.brokers[i].id == body.id){
                this.brokers[i].balance = body.balance
                break
            }
        }
        this.write_to_file()
    }

    addBroker(body: any){
        this.update_brokers()
        body.id = this.id
        this.brokers.push(body)
        this.write_to_file()
        this.id++
    }
}
