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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("./entities/session.entity");
const patients_service_1 = require("../patients/patients.service");
let SessionsService = class SessionsService {
    sessionsRepository;
    patientsService;
    EDIT_WINDOW_MINUTES = 10;
    constructor(sessionsRepository, patientsService) {
        this.sessionsRepository = sessionsRepository;
        this.patientsService = patientsService;
    }
    async create(dto, user) {
        await this.patientsService.findOne(dto.patientId);
        if (user.role === 'psychologist') {
            dto.vitalSigns = undefined;
            dto.prescription = undefined;
            dto.diagnosis = undefined;
            dto.studies = undefined;
            dto.kinesicPlan = undefined;
            dto.evolution = undefined;
        }
        if (user.role === 'doctor') {
            dto.kinesicPlan = undefined;
            dto.evolution = undefined;
        }
        if (user.role === 'kinesiologist') {
            dto.diagnosis = undefined;
            dto.prescription = undefined;
            dto.studies = undefined;
            dto.vitalSigns = undefined;
        }
        const session = this.sessionsRepository.create({
            patientId: dto.patientId,
            content: dto.content,
            importantEvents: dto.importantEvents,
            vitalSigns: dto.vitalSigns,
            diagnosis: dto.diagnosis,
            prescription: dto.prescription,
            studies: dto.studies,
            kinesicPlan: dto.kinesicPlan,
            evolution: dto.evolution,
            isLocked: false,
        });
        return this.sessionsRepository.save(session);
    }
    async findAll() {
        return this.sessionsRepository
            .createQueryBuilder('session')
            .innerJoinAndSelect('session.patient', 'patient')
            .leftJoinAndSelect('session.addenda', 'addenda')
            .where('patient.status = :status', { status: 'active' })
            .orderBy('session.createdAt', 'DESC')
            .getMany();
    }
    async findAllByPatient(patientId, page = 1, limit = 30) {
        await this.patientsService.findOne(patientId);
        const [data, total] = await this.sessionsRepository.findAndCount({
            where: { patientId },
            relations: ['addenda'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { data, total };
    }
    async findOne(id) {
        const session = await this.sessionsRepository.findOne({
            where: { id },
            relations: ['addenda', 'patient'],
        });
        if (!session) {
            throw new common_1.NotFoundException('Sesión no encontrada');
        }
        await this.autoLockIfExpired(session);
        return session;
    }
    async update(id, dto, user) {
        const session = await this.findOne(id);
        if (session.isLocked) {
            throw new common_1.ForbiddenException('Sesión bloqueada. Use una adenda.');
        }
        if (this.isEditWindowExpired(session)) {
            await this.lock(session);
            throw new common_1.ForbiddenException('Ventana de edición expirada. Use una adenda.');
        }
        if (user.role === 'psychologist') {
            dto.vitalSigns = undefined;
            dto.prescription = undefined;
            dto.diagnosis = undefined;
            dto.studies = undefined;
            dto.kinesicPlan = undefined;
            dto.evolution = undefined;
        }
        if (user.role === 'doctor') {
            dto.kinesicPlan = undefined;
            dto.evolution = undefined;
        }
        if (user.role === 'kinesiologist') {
            dto.diagnosis = undefined;
            dto.prescription = undefined;
            dto.studies = undefined;
            dto.vitalSigns = undefined;
        }
        session.content = dto.content ?? session.content;
        session.importantEvents = dto.importantEvents ?? session.importantEvents;
        session.vitalSigns = dto.vitalSigns ?? session.vitalSigns;
        session.diagnosis = dto.diagnosis ?? session.diagnosis;
        session.prescription = dto.prescription ?? session.prescription;
        session.studies = dto.studies ?? session.studies;
        session.kinesicPlan = dto.kinesicPlan ?? session.kinesicPlan;
        session.evolution = dto.evolution ?? session.evolution;
        return this.sessionsRepository.save(session);
    }
    async lockSession(id) {
        const session = await this.findOne(id);
        return this.lock(session);
    }
    async lock(session) {
        if (!session.isLocked) {
            session.isLocked = true;
            session.lockedAt = new Date();
            return this.sessionsRepository.save(session);
        }
        return session;
    }
    async autoLockIfExpired(session) {
        if (session.isLocked)
            return;
        if (this.isEditWindowExpired(session)) {
            await this.lock(session);
        }
    }
    isEditWindowExpired(session) {
        const expiresAt = new Date(session.createdAt).getTime() +
            this.EDIT_WINDOW_MINUTES * 60_000;
        return Date.now() > expiresAt;
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        patients_service_1.PatientsService])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map