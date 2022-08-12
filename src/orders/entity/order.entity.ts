import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IOrder } from '../interface/interface';

@Entity()
export class OrderEntity implements IOrder{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  docs_id: number;

  @Column()
  date: Date;

  @Column()
  telephone: number;
}