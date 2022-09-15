import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, JoinColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";
import { User } from "./User";



@Entity("orders")

class Order {

  @PrimaryColumn()
  id: string;

  @Column()
  numeroDeOrden: number;

  @Column()
  cliente:string

  @Column()
  fecha: Date;

  @Column()
  status: string;

  @ManyToMany(() => Product,{
    cascade: true
  })
  @JoinTable()
  productos: Product  

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