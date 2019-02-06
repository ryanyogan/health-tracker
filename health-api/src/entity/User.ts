import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Points } from "./Points";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Points, points => points.user)
  points: Points[];
}
