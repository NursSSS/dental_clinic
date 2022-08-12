import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderEntity } from './entity/order.entity';
import { IDoctor } from './interface/doctor.interface';

@Injectable()
export class DoctorsService {
    private DoctorsList: IDoctor[]

    constructor(
        @InjectRepository(OrderEntity)
        private readonly entity: Repository<OrderEntity>,
    ) {
        this.DoctorsList = [
            {
                docs_id: 1,
                name: 'Иванов Иван',
                experience: '20 лет',
                telephone: 996700123456
            },
            {
                docs_id: 2,
                name: 'Петрова Анастасия',
                experience: '13 лет',
                telephone: 996700123456
            }
        ]
    }

    async findAll() {
        return await this.entity.find()
    }

    async findDoctors(){
        return this.DoctorsList
    }

    async create(dto: CreateOrderDto){
        dto.date = new Date(dto.date)

        if ( [6, 0].includes(dto.date.getDay()) ) {
            throw new BadRequestException('В выходные стоматология не работает')
        } else if (dto.date.getHours() < 9 || dto.date.getHours() > 16) {
            throw new BadRequestException('Cтоматология работает в будни с 9 до 16')
        } else if(dto.date < new Date()){
            throw new BadRequestException('Укажите правильную дату')
        }

        
        let item = await this.entity.findOne({
            where: [
                {   
                    docs_id: dto.docs_id,
                    date: dto.date
                }
            ]
        })

        if(item){
            throw new BadRequestException('В это время доктор занят')
        }

        return await this.entity.save(dto)
    }

    async update(id: number, dto: UpdateOrderDto){
        const order = await this.entity.findOne({
            where: [
                { id: id }
            ]
        })

        if(!order){
            throw new NotFoundException('Запись не найдена')
        }

        dto.date = new Date(dto.date)

        if ( [6, 0].includes(dto.date.getDay()) ) {
            throw new BadRequestException('В выходные стоматология не работает')
        } else if (dto.date.getHours() < 9 || dto.date.getHours() > 16) {
            throw new BadRequestException('Cтоматология работает в будни с 9 до 16')
        } else if(dto.date < new Date()){
            throw new BadRequestException('Укажите правильную дату')
        }

        
        const item = await this.entity.findOne({
            where: [
                {   
                    docs_id: dto.docs_id,
                    date: dto.date
                }
            ]
        })

        if(item){
            throw new BadRequestException('В это время доктор занят')
        }

        Object.assign(order, dto)
        return await this.entity.save(order)
    }

    async delete(id: number){
        const order = await this.entity.findOne({
            where: [
                { id: id }
            ]
        })
        if(!order){
            throw new NotFoundException('Запись не найдена')
        }

        await this.entity.delete(order)
        return { messsage: 'Запись успешно удалена' }
    }

    async doctorsOne(id: number){
        return await this.entity.find({
            where: [
                {docs_id: id}
            ]
        })
    }

    async activeOrders(){
        return await this.entity.find({
            where: [
                {date: MoreThan(new Date())}
            ]
        })
    }
}
