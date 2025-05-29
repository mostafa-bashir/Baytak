import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Project } from './project.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitName: string;

  @Column()
  unitNumber: string;

  @Column()
  price: number;

  @Column()
  area: number;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Project, (project) => project.units, { eager: true })
  project: Project;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.units, { eager: true })
  category: Category;

}
