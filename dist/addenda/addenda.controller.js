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
exports.AddendaController = void 0;
const common_1 = require("@nestjs/common");
const addenda_service_1 = require("./addenda.service");
const create_addendum_dto_1 = require("./dto/create-addendum.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AddendaController = class AddendaController {
    addendaService;
    constructor(addendaService) {
        this.addendaService = addendaService;
    }
    create(dto, req) {
        return this.addendaService.create(dto, req.user.sub);
    }
    findAllBySession(sessionId, req) {
        return this.addendaService.findAllBySession(sessionId, req.user.sub);
    }
    findOne(id, req) {
        return this.addendaService.findOne(id, req.user.sub);
    }
};
exports.AddendaController = AddendaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_addendum_dto_1.CreateAddendumDto, Object]),
    __metadata("design:returntype", void 0)
], AddendaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('session/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AddendaController.prototype, "findAllBySession", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AddendaController.prototype, "findOne", null);
exports.AddendaController = AddendaController = __decorate([
    (0, common_1.Controller)('addenda'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [addenda_service_1.AddendaService])
], AddendaController);
//# sourceMappingURL=addenda.controller.js.map