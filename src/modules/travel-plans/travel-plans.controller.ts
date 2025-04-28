import { Controller, Post, Get, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('travel-plans')
@UseGuards(JwtAuthGuard)
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  @Post()
  async create(@Body() dto: CreateTravelPlanDto, @Req() req: Request) {
    const userId = (req as any).user['id'];
    return this.travelPlansService.create(dto, userId);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = (req as any).user['id'];
    return this.travelPlansService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user['id'];
    return this.travelPlansService.findOne(id, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTravelPlanDto, @Req() req: Request) {
    const userId = (req as any).user['id'];
    return this.travelPlansService.update(id, dto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user['id'];
    await this.travelPlansService.remove(id, userId);
    return { message: 'Travel plan deleted' };
  }
} 