import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Category } from './category.entity';

@Entity()
@Unique(['userId', 'category'])
export class UserCategoryScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => Category, (category) => category.userCategoryScores, { eager: true })
  category: Category; 

  @Column({ default: 1 })
  score: number;
}
