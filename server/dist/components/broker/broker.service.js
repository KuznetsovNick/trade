"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const brokers_file = './data/brokers.json';
let BrokersService = class BrokersService {
    constructor() {
        this.update_brokers();
        this.id = -1;
        for (let i = 0; i < this.brokers.length; i++) {
            if (this.brokers[i].id >= this.id) {
                this.id = this.brokers[i].id + 1;
            }
        }
    }
    readFile(brokersFile = brokers_file) {
        return JSON.parse(fs.readFileSync(brokersFile).toString());
    }
    update_brokers() {
        this.brokers = JSON.parse(fs.readFileSync(brokers_file).toString());
    }
    write_to_file() {
        fs.writeFileSync(brokers_file, JSON.stringify(this.brokers));
    }
    deleteBroker(body) {
        this.update_brokers();
        for (let i = 0; i < this.brokers.length; i++) {
            if (this.brokers[i].id == body.id) {
                this.brokers.splice(i, 1);
                break;
            }
        }
        this.write_to_file();
    }
    changeBalance(body) {
        this.update_brokers();
        for (let i = 0; i < this.brokers.length; i++) {
            if (this.brokers[i].id == body.id) {
                this.brokers[i].balance = body.balance;
                break;
            }
        }
        this.write_to_file();
    }
    addBroker(body) {
        this.update_brokers();
        body.id = this.id;
        this.brokers.push(body);
        this.write_to_file();
        this.id++;
    }
};
exports.BrokersService = BrokersService;
exports.BrokersService = BrokersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BrokersService);
//# sourceMappingURL=broker.service.js.map