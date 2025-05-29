import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchHistory } from '../entities/search-history.entity';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectRepository(SearchHistory)
    private searchHistoryRepo: Repository<SearchHistory>,
  ) {}

  async getUserHistory(userId: string) {
    return this.searchHistoryRepo.find({
      where: { userId },
      order: { searchedAt: 'DESC' },
      skip: 0,
      take: 3 

    });
  }

}
