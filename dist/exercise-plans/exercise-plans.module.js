"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisePlansModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_plan_entity_1 = require("./entities/exercise-plan.entity");
const exercise_plans_service_1 = require("./exercise-plans.service");
const exercise_plans_controller_1 = require("./exercise-plans.controller");
let ExercisePlansModule = class ExercisePlansModule {
};
exports.ExercisePlansModule = ExercisePlansModule;
exports.ExercisePlansModule = ExercisePlansModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_plan_entity_1.ExercisePlan])],
        controllers: [exercise_plans_controller_1.ExercisePlansController],
        providers: [exercise_plans_service_1.ExercisePlansService],
    })
], ExercisePlansModule);
//# sourceMappingURL=exercise-plans.module.js.map