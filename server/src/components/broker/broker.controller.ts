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
  @Post("/redact")
  changeBalance(@Res() res: Response, @Body() body: any){
    this.service.changeBalance(body)
    res.end()
  }

  @Post("/add_broker")
  addBroker(@Res() res: Response, @Body() body: any){
    this.service.addBroker(body)
    res.end()
  }
}
