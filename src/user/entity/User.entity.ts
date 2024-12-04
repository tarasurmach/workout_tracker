import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
export type UnitSystem = "metric" | "imperial";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: string;

  @Column({ type: "enum", enum: ["metric", "imperial"], default: "metric" })
  unitSystem?: UnitSystem;

  @Column({ type: "int", nullable: true })
  height: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight: number;
}
