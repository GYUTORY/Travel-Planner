import { Controller, Get, Query, Param } from '@nestjs/common';
import { PlacesService } from './places.service';
import { SearchPlacesDto } from './dto/search-places.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('search')
  async search(@Query() query: SearchPlacesDto) {
    return this.placesService.search(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }
} 