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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./entities/patient.entity");
const audit_service_1 = require("../audit/audit.service");
let PatientsService = class PatientsService {
    patientsRepository;
    auditService;
    constructor(patientsRepository, auditService) {
        this.patientsRepository = patientsRepository;
        this.auditService = auditService;
    }
    async create(dto, user) {
        const existing = await this.patientsRepository.findOne({
            where: { dni: dto.dni },
        });
        if (existing) {
            throw new common_1.ConflictException(`Ya existe un paciente con DNI ${dto.dni}`);
        }
        const patient = this.patientsRepository.create({
            ...dto,
            status: 'active',
        });
        const saved = await this.patientsRepository.save(patient);
        await this.auditService.log(user.sub, 'CREATE', 'PATIENT', saved.id);
        return saved;
    }
    async findAll(status, page = 1, limit = 50) {
        const [data, total] = await this.patientsRepository.findAndCount({
            where: status ? { status } : {},
            order: { createdAt: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { data, total };
    }
    async findOne(id) {
        const patient = await this.patientsRepository.findOne({
            where: { id },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Paciente con ID ${id} no encontrado`);
        }
        return patient;
    }
    async update(id, dto, user) {
        const patient = await this.findOne(id);
        if (dto.status === 'inactive' && !dto.dischargeDate) {
            throw new common_1.ConflictException('Para dar de baja un paciente se requiere la fecha de egreso');
        }
        if (dto.status === 'active') {
            patient.dischargeDate = undefined;
            patient.dischargeReason = undefined;
        }
        Object.assign(patient, dto);
        const updated = await this.patientsRepository.save(patient);
        await this.auditService.log(user.sub, 'EDIT', 'PATIENT', id);
        return updated;
    }
    async discharge(id, dischargeDate, dischargeReason, user) {
        const patient = await this.findOne(id);
        patient.status = 'inactive';
        patient.dischargeDate = new Date(dischargeDate);
        patient.dischargeReason = dischargeReason;
        const saved = await this.patientsRepository.save(patient);
        await this.auditService.log(user.sub, 'EDIT', 'PATIENT', id);
        return saved;
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map