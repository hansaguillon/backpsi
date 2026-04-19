"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAttachmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_attachments_controller_1 = require("./session-attachments.controller");
const session_attachments_service_1 = require("./session-attachments.service");
const session_attachment_entity_1 = require("./entities/session-attachment.entity");
const session_entity_1 = require("../sessions/entities/session.entity");
let SessionAttachmentsModule = class SessionAttachmentsModule {
};
exports.SessionAttachmentsModule = SessionAttachmentsModule;
exports.SessionAttachmentsModule = SessionAttachmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                session_attachment_entity_1.SessionAttachment,
                session_entity_1.Session,
            ]),
        ],
        controllers: [session_attachments_controller_1.SessionAttachmentsController],
        providers: [session_attachments_service_1.SessionAttachmentsService],
    })
], SessionAttachmentsModule);
//# sourceMappingURL=session-attachments.module.js.map