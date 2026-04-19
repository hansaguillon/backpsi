"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddendaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const addenda_service_1 = require("./addenda.service");
const addenda_controller_1 = require("./addenda.controller");
const addendum_entity_1 = require("./entities/addendum.entity");
const sessions_module_1 = require("../sessions/sessions.module");
const users_module_1 = require("../users/users.module");
const audit_module_1 = require("../audit/audit.module");
let AddendaModule = class AddendaModule {
};
exports.AddendaModule = AddendaModule;
exports.AddendaModule = AddendaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([addendum_entity_1.Addendum]),
            (0, common_1.forwardRef)(() => sessions_module_1.SessionsModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => audit_module_1.AuditModule),
        ],
        controllers: [addenda_controller_1.AddendaController],
        providers: [addenda_service_1.AddendaService],
        exports: [addenda_service_1.AddendaService],
    })
], AddendaModule);
//# sourceMappingURL=addenda.module.js.map