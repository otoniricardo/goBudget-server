import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('sales')
class Sale {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  product_code: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  sold_in: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sale;
