import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(dto: { name: string }) {
    const exists = await this.projectRepo.findOneBy({ name: ILike(dto.name) });
    if (exists) {
      throw new BadRequestException('Project already exists');
    }
    return this.projectRepo.save(this.projectRepo.create(dto));
  }

  async findAll() {
    return this.projectRepo.find({
      relations: ['units'], // Manually load units when needed
    });

  }
}
