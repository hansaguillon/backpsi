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
exports.AddendaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const addendum_entity_1 = require("./entities/addendum.entity");
const audit_service_1 = require("../audit/audit.service");
const sessions_service_1 = require("../sessions/sessions.service");
let AddendaService = class AddendaService {
    addendaRepository;
    auditService;
    sessionsService;
    constructor(addendaRepository, auditService, sessionsService) {
        this.addendaRepository = addendaRepository;
        this.auditService = auditService;
        this.sessionsService = sessionsService;
    }
    async create(dto, userId) {
        const session = await this.sessionsService.findOne(dto.sessionId);
        if (!session.isLocked) {
            throw new common_1.ForbiddenException('Solo se pueden crear adendas en sesiones bloqueadas.');
        }
        const addendum = this.addendaRepository.create({
            session_id: dto.sessionId,
            content: dto.content,
            reason: dto.reason,
            created_by: userId,
        });
        const saved = await this.addendaRepository.save(addendum);
        await this.auditService.log(userId, 'CREATE', 'ADDENDUM', saved.id, 'Se creó una adenda');
        return saved;
    }
    async findAllBySession(sessionId, userId) {
        await this.sessionsService.findOne(sessionId);
        return this.addendaRepository.find({
            where: { session_id: sessionId },
            order: { created_at: 'ASC' },
        });
    }
    async findOne(id, userId) {
        const addendum = await this.addendaRepository.findOne({
            where: { id },
            relations: ['session'],
        });
        if (!addendum) {
            throw new common_1.NotFoundException(`Adenda con ID ${id} no encontrada`);
        }
        await this.sessionsService.findOne(addendum.session_id);
        return addendum;
    }
};
exports.AddendaService = AddendaService;
exports.AddendaService = AddendaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(addendum_entity_1.Addendum)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService,
        sessions_service_1.SessionsService])
], AddendaService);
//# sourceMappingURL=addenda.service.js.map