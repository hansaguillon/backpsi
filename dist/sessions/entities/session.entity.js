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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("../../patients/entities/patient.entity");
const addendum_entity_1 = require("../../addenda/entities/addendum.entity");
const session_attachment_entity_1 = require("../../session-attachments/entities/session-attachment.entity");
const vital_signs_dto_1 = require("../dto/vital-signs.dto");
const kinesic_plan_dto_1 = require("../dto/kinesic-plan.dto");
let Session = class Session {
    id;
    patientId;
    patient;
    content;
    importantEvents;
    vitalSigns;
    diagnosis;
    prescription;
    studies;
    kinesicPlan;
    evolution;
    isLocked;
    lockedAt;
    createdAt;
    updatedAt;
    addenda;
    attachments;
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'patient_id' }),
    __metadata("design:type", String)
], Session.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.Patient, (patient) => patient.sessions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", patient_entity_1.Patient)
], Session.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Session.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'important_events', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "importantEvents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vital_signs', type: 'json', nullable: true }),
    __metadata("design:type", vital_signs_dto_1.VitalSignsDto)
], Session.prototype, "vitalSigns", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "diagnosis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "prescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "studies", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'kinesic_plan', type: 'json', nullable: true }),
    __metadata("design:type", kinesic_plan_dto_1.KinesicPlanDto)
], Session.prototype, "kinesicPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "evolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_locked', default: false }),
    __metadata("design:type", Boolean)
], Session.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locked_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Session.prototype, "lockedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Session.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Session.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => addendum_entity_1.Addendum, (addendum) => addendum.session),
    __metadata("design:type", Array)
], Session.prototype, "addenda", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_attachment_entity_1.SessionAttachment, (attachment) => attachment.session),
    __metadata("design:type", Array)
], Session.prototype, "attachments", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)('sessions')
], Session);
//# sourceMappingURL=session.entity.js.map