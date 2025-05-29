import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Category } from '../entities/category.entity';
import { Unit } from '../entities/unit.entity';
import { Project } from 'src/entities/project.entity';
import { SearchHistory } from 'src/entities/search-history.entity';
import { UserCategoryScore } from 'src/entities/user-category-score.entity';
import axios from 'axios';
const FormData = require('form-data');

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepo: Repository<Unit>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(Project)
    private projectRepo: Repository<Project>,

    @InjectRepository(SearchHistory) private readonly searchHistoryRepo: Repository<SearchHistory>,

    @InjectRepository(UserCategoryScore) private readonly userCategoryScoreRepo: Repository<UserCategoryScore>,


  ) {}

  async create(dto: CreateUnitDto, file: Express.Multer.File) {

    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new BadRequestException('Category not found');

    const project = await this.projectRepo.findOneBy({ id: dto.projectId });
    if (!project) throw new BadRequestException('Project not found');

    // Prepare multipart form data
    const formData = new FormData();
    formData.append('image', file.buffer.toString('base64')); // base64 string in body
    formData.append('name', file.originalname);


    const apiKey = '2b5ccaf4c35136e60cb83954717b12b1';
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const response = await axios.post(uploadUrl, formData, {
      headers: formData.getHeaders(),
    });


    const imageUrl = response.data?.data?.url;
    if (!imageUrl) throw new BadRequestException('Image upload failed');

    const unit = this.unitRepo.create({
      ...dto,
      image: imageUrl,
      category,
      project,
    });

    const saved = await this.unitRepo.save(unit);
    return { success: true, data: saved };
  }


  async findAll(search?: string, sessionId?: string) {
  if (search && sessionId) {
    const searchHistory = this.searchHistoryRepo.create({
      userId: sessionId,
      searchText: search,
    });
    await this.searchHistoryRepo.save(searchHistory);
  }

  const query = this.unitRepo
    .createQueryBuilder('unit')
    .leftJoinAndSelect('unit.project', 'project')
    .leftJoinAndSelect('unit.category', 'category');

  // Join category scores and filter by sessionId if present
  if (sessionId) {
    query.leftJoinAndSelect(
      'category.userCategoryScores',
      'score',
      'score.userId = :sessionId',
      { sessionId },
    );
  } else {
    query.leftJoinAndSelect('category.userCategoryScores', 'score');
  }

  if (search) {
    query.where('unit.unitName ILIKE :search', { search: `%${search}%` })
      .orWhere('unit.unitNumber LIKE :search', { search: `%${search}%` })
      .orWhere('project.name ILIKE :search', { search: `%${search}%` });
  }

  query.orderBy('COALESCE(score.score, 0)', 'DESC');

  const units = await query.getMany();
  return { success: true, data: units };
}


  async findOne(id: number, userId?: string) {
  const unit = await this.unitRepo.findOne({ where: { id }, relations: ['category'] });

  if (!unit) {
    return { success: false, message: 'Unit not found' };
  }

  if (userId) {
    const existingScore = await this.userCategoryScoreRepo.findOne({
      where: { userId, category: unit.category },
    });

    if (existingScore) {
      existingScore.score += 1;
      await this.userCategoryScoreRepo.save(existingScore);
    } else {
      const newScore = this.userCategoryScoreRepo.create({
        userId,
        category: unit.category,
        score: 1,
      });
      await this.userCategoryScoreRepo.save(newScore);
    }
  }

  return { success: true, data: unit };
}


}
