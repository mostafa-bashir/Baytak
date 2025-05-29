import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Unit } from './unit.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Unit, (unit) => unit.project)
  units: Unit[];
}
