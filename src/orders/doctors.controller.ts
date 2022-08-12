import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { UpdateOrderDto } from './dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class DoctorsController {
    constructor(private service: DoctorsService){}

    @Get()
    async findAll(){
        return await this.service.findAll()
    }

    @Get('doctors')
    async findDoctors(){
        return await this.service.findDoctors()
    }

    @Post()
    async create(@Body() dto: CreateOrderDto){
        return await this.service.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: number, dto: UpdateOrderDto){
        return await this.service.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.service.delete(id)
    }

    @Get('doctors/:id')
    async doctorsOne(@Param('id') id: number){
        return await this.service.doctorsOne(id)
    }

    @Get('active')
    async activeOrders(){
        return await this.service.activeOrders()
    }
}
