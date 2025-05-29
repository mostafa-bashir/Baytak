import { Module } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistory } from 'src/entities/search-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory])],
  providers: [SearchHistoryService],
  controllers: [SearchHistoryController],
  exports: [SearchHistoryService],
})
export class SearchHistoryModule {}
