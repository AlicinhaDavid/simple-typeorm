import { Entity, Column } from "typeorm";

@Entity()
export class Product {
  @Column()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  color: string;
}
