import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('suppliers')
class Supplier {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  supplier_name: string;

  @Field()
  @Column()
  contact_name: string;

  @Field()
  @Column()
  contact_email: string;

  @Field()
  @Column()
  contact_phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Supplier;
