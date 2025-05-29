import { Controller, Post, Get, Param, Body, Headers, Query,  UploadedFile,
  UseInterceptors, } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateUnitDto,
  ) {
    return this.unitService.create(dto, file);
  }

  @Get()
  async findAll(
    @Query('search') search: string,
    @Headers('x-session-id') sessionId?: string, // optional sessionId header
  ) {
    return this.unitService.findAll(search, sessionId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('x-session-id') sessionId?: string,
  ) {
    return this.unitService.findOne(+id, sessionId);
  }
}
