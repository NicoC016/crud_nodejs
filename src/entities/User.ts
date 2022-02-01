import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  username!: string;

  @PrimaryColumn({nullable: false})
  password: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

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