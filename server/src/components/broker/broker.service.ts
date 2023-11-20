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

    getBroker(body: any){
        this.update_brokers()
        for(let i = 0; i < this.brokers.length; i++){
            if(this.brokers[i].id == body.id){
                return this.brokers[i]
            }
        }
        return null
    }

    changeName(body: any){
        this.update_brokers()
        for(let i = 0; i < this.brokers.length; i++){
            if(this.brokers[i].id == body.id){
                this.brokers[i].name = body.name
                break
            }
        }
        this.write_to_file()
    }

    getPersonalStocks(body: any){
        const res = []
        const file = JSON.parse(fs.readFileSync("./data/brokers_stocks.json").toString());
        for(let i = 0; i < file.length; i++){
            if(file[i].id === body.id){
                for(let j = 0; j < body.stocks.length; j++){
                    res.push(file[i][body.stocks[j]])
                }
                return {data: res}
            }
        }
        return null
    }

    deal(body: any){
        const stock_file = JSON.parse(fs.readFileSync("./data/brokers_stocks.json").toString());
        this.update_brokers()
        let broker_ind
        for(let i = 0; i < this.brokers.length; i++){
            if(body.id === this.brokers[i].id){
                broker_ind = i
                break
            }
        }
        let status
        for(let i = 0; i < stock_file.length; i++){
            //console.log(body)
            if(stock_file[i].id === body.id){
                if(body.sum > this.brokers[broker_ind].balance){
                    status = "no money"
                }
                else if(body.qty < 0 && Math.abs(body.qty) > stock_file[i][body.stock].qty) {
                    status = "no stocks"
                }
                else {
                    this.brokers[broker_ind].balance -= body.sum
                    stock_file[i][body.stock].qty += body.qty
                    stock_file[i][body.stock].balance -= body.sum
                    status = "ok"
                    fs.writeFileSync("./data/brokers_stocks.json", JSON.stringify(stock_file))
                    this.write_to_file()
                    return {status: status, balance: this.brokers[broker_ind].balance.toFixed(2),
                        qty: stock_file[i][body.stock].qty, stock_balance: stock_file[i][body.stock].balance.toFixed(2)}
                }
                break
            }
        }


        fs.writeFileSync("./data/brokers_stocks.json", JSON.stringify(stock_file))
        this.write_to_file()
        return {status: status}
    }
}
