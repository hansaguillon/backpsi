"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisePlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exercise_plan_entity_1 = require("./entities/exercise-plan.entity");
let ExercisePlansService = class ExercisePlansService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto, userId) {
        const plan = this.repo.create({
            patientId: dto.patientId,
            createdBy: userId,
            title: dto.title ?? 'Rutina de Ejercicios',
            daysPerWeek: dto.daysPerWeek,
            days: dto.days,
            observations: dto.observations,
        });
        return this.repo.save(plan);
    }
    async findByPatient(patientId) {
        return this.repo.find({
            where: { patientId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const plan = await this.repo.findOne({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('Plan de ejercicios no encontrado');
        return plan;
    }
    async update(id, dto) {
        const plan = await this.findOne(id);
        Object.assign(plan, dto);
        return this.repo.save(plan);
    }
    async archive(id) {
        const plan = await this.findOne(id);
        plan.status = 'archived';
        return this.repo.save(plan);
    }
};
exports.ExercisePlansService = ExercisePlansService;
exports.ExercisePlansService = ExercisePlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_plan_entity_1.ExercisePlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExercisePlansService);
//# sourceMappingURL=exercise-plans.service.js.map