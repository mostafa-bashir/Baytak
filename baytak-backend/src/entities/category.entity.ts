import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Unit } from './unit.entity';
import { UserCategoryScore } from './user-category-score.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Unit, (unit) => unit.category)
  units: Unit[];

  @OneToMany(() => UserCategoryScore, (score) => score.category)
  userCategoryScores: UserCategoryScore[];
}
