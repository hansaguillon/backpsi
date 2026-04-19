"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_service_1 = require("./app.service");
const network_controller_1 = require("./network/network.controller");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const patients_module_1 = require("./patients/patients.module");
const sessions_module_1 = require("./sessions/sessions.module");
const audit_module_1 = require("./audit/audit.module");
const addenda_module_1 = require("./addenda/addenda.module");
const backup_module_1 = require("./backup/backup.module");
const session_attachments_module_1 = require("./session-attachments/session-attachments.module");
const uploads_module_1 = require("./uploads/uploads.module");
const exercise_plans_module_1 = require("./exercise-plans/exercise-plans.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: (0, path_1.join)(__dirname, '..', '.env'),
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{ name: 'default', ttl: 60_000, limit: 100 }],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST', 'localhost'),
                    port: config.get('DB_PORT', 3306),
                    username: config.get('DB_USER', 'root'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME', 'clinical_db'),
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: config.get('NODE_ENV') === 'development',
                    extra: { connectTimeout: 10000 },
                }),
            }),
            backup_module_1.BackupModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            patients_module_1.PatientsModule,
            sessions_module_1.SessionsModule,
            audit_module_1.AuditModule,
            uploads_module_1.UploadsModule,
            addenda_module_1.AddendaModule,
            session_attachments_module_1.SessionAttachmentsModule,
            exercise_plans_module_1.ExercisePlansModule,
        ],
        controllers: [network_controller_1.NetworkController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map