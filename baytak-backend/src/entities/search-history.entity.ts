import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; 

  @Column()
  searchText: string;

  @CreateDateColumn()
  searchedAt: Date;
}
