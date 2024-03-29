import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity("products")
class Product {

  @PrimaryColumn()
  id:string;

  @Column()
  productname: string;

  @Column()
  price: number;

  @Column()
  type: "varchar";
  length: 1;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId'})
  category: Category;

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

export { Product };