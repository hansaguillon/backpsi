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
exports.Patient = void 0;
const typeorm_1 = require("typeorm");
const session_entity_1 = require("../../sessions/entities/session.entity");
let Patient = class Patient {
    id;
    firstName;
    lastName;
    dni;
    birthDate;
    phone;
    email;
    admissionDate;
    referralSource;
    billingId;
    consultReason;
    treatmentNotes;
    status;
    dischargeDate;
    dischargeReason;
    createdAt;
    updatedAt;
    sessions;
};
exports.Patient = Patient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Patient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', length: 100 }),
    __metadata("design:type", String)
], Patient.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', length: 100 }),
    __metadata("design:type", String)
], Patient.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'birth_date',
        type: 'date',
    }),
    __metadata("design:type", Date)
], Patient.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Patient.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'admission_date',
        type: 'date',
    }),
    __metadata("design:type", Date)
], Patient.prototype, "admissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'referral_source',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Patient.prototype, "referralSource", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'billing_id',
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Patient.prototype, "billingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'consult_reason',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Patient.prototype, "consultReason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'treatment_notes',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Patient.prototype, "treatmentNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active',
    }),
    __metadata("design:type", String)
], Patient.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'discharge_date',
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Patient.prototype, "dischargeDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'discharge_reason',
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", String)
], Patient.prototype, "dischargeReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Patient.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Patient.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.patient),
    __metadata("design:type", Array)
], Patient.prototype, "sessions", void 0);
exports.Patient = Patient = __decorate([
    (0, typeorm_1.Entity)('patients'),
    (0, typeorm_1.Index)('idx_dni', ['dni']),
    (0, typeorm_1.Index)('idx_last_name', ['lastName'])
], Patient);
//# sourceMappingURL=patient.entity.js.map