import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisePlan } from './entities/exercise-plan.entity';
import { ExercisePlansService } from './exercise-plans.service';
import { ExercisePlansController } from './exercise-plans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExercisePlan])],
  controllers: [ExercisePlansController],
  providers: [ExercisePlansService],
})
export class ExercisePlansModule {}
