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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersController = void 0;
const common_1 = require("@nestjs/common");
const broker_service_1 = require("./broker.service");
let BrokersController = class BrokersController {
    constructor(service) {
        this.service = service;
    }
    getBrokers(res) {
        res.json(this.service.readFile());
    }
    deleteBroker(res, body) {
        this.service.deleteBroker(body);
        res.end();
    }
    changeBalance(res, body) {
        this.service.changeBalance(body);
        res.end();
    }
    changeName(res, body) {
        this.service.changeName(body);
        res.end();
    }
    getPersonalStocks(res, body) {
        res.json(this.service.getPersonalStocks(body));
    }
    deal(res, body) {
        res.json(this.service.deal(body));
    }
    getBroker(res, body) {
        res.send(this.service.getBroker(body));
    }
    addBroker(res, body) {
        this.service.addBroker(body);
        res.end();
    }
};
exports.BrokersController = BrokersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "getBrokers", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "deleteBroker", null);
__decorate([
    (0, common_1.Post)("/set_balance"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "changeBalance", null);
__decorate([
    (0, common_1.Post)("/set_name"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "changeName", null);
__decorate([
    (0, common_1.Post)("/get_personal_stocks"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "getPersonalStocks", null);
__decorate([
    (0, common_1.Post)("/deal"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "deal", null);
__decorate([
    (0, common_1.Post)("/get_broker"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "getBroker", null);
__decorate([
    (0, common_1.Post)("/add_broker"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "addBroker", null);
exports.BrokersController = BrokersController = __decorate([
    (0, common_1.Controller)('/api/brokers'),
    __metadata("design:paramtypes", [broker_service_1.BrokersService])
], BrokersController);
//# sourceMappingURL=broker.controller.js.map