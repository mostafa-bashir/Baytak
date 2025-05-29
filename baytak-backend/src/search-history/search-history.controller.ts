import { Controller, Get, Headers, BadRequestException } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Get()
  async getHistory( @Headers('x-session-id') sessionId?: string) {
    if (!sessionId) throw new BadRequestException('userId query parameter is required');
    const history = await this.searchHistoryService.getUserHistory(sessionId);
    return { success: true, data: history };
  }
}
