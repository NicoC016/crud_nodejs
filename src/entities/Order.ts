import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";
import { User } from "./User";



@Entity("orders")

class Order {

  @PrimaryColumn()
  id: string;

  @Column()
  numeroDeOrden: number;

  @ManyToOne(()=>User, user =>user.orders)
  @JoinColumn({name:"cliente"})
  cliente:User

  @Column()
  fecha: Date;

  @Column()
  status: string;

  @ManyToMany(() => Product)
  @JoinColumn()
  productos: Product[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}


export{Order}