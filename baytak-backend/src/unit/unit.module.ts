import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { CategoryModule } from 'src/category/category.module';
import { Unit } from 'src/entities/unit.entity';
import { Category } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { SearchHistory } from 'src/entities/search-history.entity';
import { UserCategoryScore } from 'src/entities/user-category-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Category, Project, SearchHistory, UserCategoryScore])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
