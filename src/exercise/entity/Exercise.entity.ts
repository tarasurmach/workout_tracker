import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entity/User.entity";

@Entity()
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  category: string;

  @Column({ type: "varchar" })
  type: string;

  @Column({ type: "varchar", name: "muscle_group" })
  muscleGroup: string;

  @Column({ type: "varchar", length: 255, name: "media_url", nullable: true })
  mediaUrl: string;

  @Column({ type: "enum", enum: ["beginner", "intermediate", "advanced"] })
  difficulty: string;

  @JoinColumn({ name: "created_by" })
  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
