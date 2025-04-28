import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private travelPlanRepository: Repository<TravelPlan>,
  ) {}

  async create(createDto: CreateTravelPlanDto, userId: string): Promise<TravelPlan> {
    const travelPlan = this.travelPlanRepository.create({ ...createDto, userId });
    return this.travelPlanRepository.save(travelPlan);
  }

  async findAll(userId: string): Promise<TravelPlan[]> {
    return this.travelPlanRepository.find({ where: { userId } });
  }

  async findOne(id: string, userId: string): Promise<TravelPlan> {
    const plan = await this.travelPlanRepository.findOne({ where: { id, userId } });
    if (!plan) throw new NotFoundException('Travel plan not found');
    return plan;
  }

  async update(id: string, updateDto: UpdateTravelPlanDto, userId: string): Promise<TravelPlan> {
    const plan = await this.findOne(id, userId);
    Object.assign(plan, updateDto);
    return this.travelPlanRepository.save(plan);
  }

  async remove(id: string, userId: string): Promise<void> {
    const plan = await this.findOne(id, userId);
    await this.travelPlanRepository.remove(plan);
  }
} 