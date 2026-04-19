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
exports.CreateAuditDto = exports.EntityType = exports.AuditAction = void 0;
const class_validator_1 = require("class-validator");
var AuditAction;
(function (AuditAction) {
    AuditAction["CREATE"] = "CREATE";
    AuditAction["EDIT"] = "EDIT";
    AuditAction["LOCK"] = "LOCK";
    AuditAction["ADDENDUM"] = "ADDENDUM";
    AuditAction["ACCESS"] = "ACCESS";
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
var EntityType;
(function (EntityType) {
    EntityType["PATIENT"] = "PATIENT";
    EntityType["SESSION"] = "SESSION";
    EntityType["ADDENDUM"] = "ADDENDUM";
    EntityType["SYSTEM"] = "SYSTEM";
})(EntityType || (exports.EntityType = EntityType = {}));
class CreateAuditDto {
    action;
    entityType;
    entityId;
    details;
    userId;
    ipAddress;
}
exports.CreateAuditDto = CreateAuditDto;
__decorate([
    (0, class_validator_1.IsEnum)(AuditAction),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EntityType),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "entityType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "entityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "ipAddress", void 0);
//# sourceMappingURL=create-audit.dto.js.map