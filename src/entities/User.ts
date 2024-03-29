import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./Order";

@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string

  @Column()
  username: string;

  @Column({nullable: false})
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;
  
  @OneToMany(() => Order, order=> order.cliente)
  order:Order[]

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { User };