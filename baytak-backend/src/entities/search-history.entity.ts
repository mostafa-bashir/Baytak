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
  userId: string; // or number, depending on your user ID type

  @Column()
  searchText: string; // 🔄 stores the actual search string

  @CreateDateColumn()
  searchedAt: Date;
}
