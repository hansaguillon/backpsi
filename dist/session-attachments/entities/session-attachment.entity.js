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
exports.SessionAttachment = void 0;
const typeorm_1 = require("typeorm");
const session_entity_1 = require("../../sessions/entities/session.entity");
let SessionAttachment = class SessionAttachment {
    id;
    sessionId;
    session;
    url;
    originalName;
    mimeType;
    size;
    createdAt;
};
exports.SessionAttachment = SessionAttachment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SessionAttachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'session_id' }),
    __metadata("design:type", String)
], SessionAttachment.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => session_entity_1.Session, (session) => session.attachments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    __metadata("design:type", session_entity_1.Session)
], SessionAttachment.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], SessionAttachment.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_name', length: 255 }),
    __metadata("design:type", String)
], SessionAttachment.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 100 }),
    __metadata("design:type", String)
], SessionAttachment.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], SessionAttachment.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SessionAttachment.prototype, "createdAt", void 0);
exports.SessionAttachment = SessionAttachment = __decorate([
    (0, typeorm_1.Entity)('session_attachments')
], SessionAttachment);
//# sourceMappingURL=session-attachment.entity.js.map