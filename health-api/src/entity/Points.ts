import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Points {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column()
  exercise: number;

  @Column()
  diet: number;

  @Column()
  alcohol: number;

  @Column()
  notes: string;

  @ManyToMany(() => User, user => user.points, { cascade: ["insert"] })
  user: User | null;
}
