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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisePlan = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("../../patients/entities/patient.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let ExercisePlan = class ExercisePlan {
    id;
    patientId;
    patient;
    createdBy;
    creator;
    title;
    daysPerWeek;
    days;
    observations;
    status;
    createdAt;
    updatedAt;
};
exports.ExercisePlan = ExercisePlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExercisePlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'patient_id' }),
    __metadata("design:type", String)
], ExercisePlan.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.Patient, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", patient_entity_1.Patient)
], ExercisePlan.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'created_by' }),
    __metadata("design:type", String)
], ExercisePlan.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], ExercisePlan.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: 'Rutina de Ejercicios' }),
    __metadata("design:type", String)
], ExercisePlan.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'days_per_week', type: 'tinyint', unsigned: true, default: 3 }),
    __metadata("design:type", Number)
], ExercisePlan.prototype, "daysPerWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], ExercisePlan.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ExercisePlan.prototype, "observations", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['active', 'archived'],
        default: 'active',
    }),
    __metadata("design:type", String)
], ExercisePlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ExercisePlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ExercisePlan.prototype, "updatedAt", void 0);
exports.ExercisePlan = ExercisePlan = __decorate([
    (0, typeorm_1.Entity)('exercise_plans')
], ExercisePlan);
//# sourceMappingURL=exercise-plan.entity.js.map