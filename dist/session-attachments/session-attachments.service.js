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
exports.SessionAttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const session_attachment_entity_1 = require("./entities/session-attachment.entity");
const session_entity_1 = require("../sessions/entities/session.entity");
let SessionAttachmentsService = class SessionAttachmentsService {
    attachmentsRepository;
    sessionsRepository;
    constructor(attachmentsRepository, sessionsRepository) {
        this.attachmentsRepository = attachmentsRepository;
        this.sessionsRepository = sessionsRepository;
    }
    async addMany(sessionId, files) {
        const session = await this.sessionsRepository.findOne({
            where: { id: sessionId },
        });
        if (!session) {
            throw new common_1.NotFoundException('Sesión no encontrada');
        }
        if (session.isLocked) {
            throw new common_1.ForbiddenException('La sesión está bloqueada. No se pueden adjuntar archivos.');
        }
        const attachments = files.map((file) => this.attachmentsRepository.create({
            sessionId,
            url: file.url,
            originalName: file.originalName,
            mimeType: file.mimeType,
            size: file.size,
        }));
        return this.attachmentsRepository.save(attachments);
    }
    async findBySession(sessionId) {
        return this.attachmentsRepository.find({
            where: { sessionId },
            order: { createdAt: 'ASC' },
        });
    }
};
exports.SessionAttachmentsService = SessionAttachmentsService;
exports.SessionAttachmentsService = SessionAttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(session_attachment_entity_1.SessionAttachment)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SessionAttachmentsService);
//# sourceMappingURL=session-attachments.service.js.map