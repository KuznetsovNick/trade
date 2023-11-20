import {Body, Controller, Delete, Get, Post, Res} from '@nestjs/common';
import { BrokersService } from './broker.service';
import { Response} from 'express';

@Controller('/api/brokers')
export class BrokersController {
  constructor(private readonly service: BrokersService) {}
  @Get()
  getBrokers(@Res() res: Response): void {
    res.json(this.service.readFile());
  }
  @Delete()
  deleteBroker(@Res() res: Response, @Body() body: any){
    this.service.deleteBroker(body)
    res.end()
  }
  @Post("/set_balance")
  changeBalance(@Res() res: Response, @Body() body: any){
    this.service.changeBalance(body)
    res.end()
  }

  @Post("/set_name")
  changeName(@Res() res: Response, @Body() body: any){
    this.service.changeName(body)
    res.end()
  }

  @Post("/get_personal_stocks")
  getPersonalStocks(@Res() res: Response, @Body() body: any){
    res.json(this.service.getPersonalStocks(body))
  }

  @Post("/deal")
  deal(@Res() res: Response, @Body() body: any){
    res.json(this.service.deal(body))
  }

  @Post("/get_broker")
  getBroker(@Res() res: Response, @Body() body: any){
    res.send(this.service.getBroker(body))
  }

  @Post("/add_broker")
  addBroker(@Res() res: Response, @Body() body: any){
    this.service.addBroker(body)
    res.end()
  }
}
