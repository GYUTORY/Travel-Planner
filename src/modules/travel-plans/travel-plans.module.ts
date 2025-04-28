import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TravelPlan])],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
})
export class TravelPlansModule {} 