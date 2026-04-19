"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const express = __importStar(require("express"));
const os = __importStar(require("os"));
function buildAllowedOrigins() {
    const patterns = [
        /^http:\/\/localhost(:\d+)?$/,
        /^http:\/\/127\.0\.0\.1(:\d+)?$/,
        /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,
        /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/,
        /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}(:\d+)?$/,
    ];
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        if (!iface)
            continue;
        for (const addr of iface) {
            if (addr.family !== 'IPv4' || addr.internal)
                continue;
            const subnet = addr.address.split('.').slice(0, 3).join('\\.');
            patterns.push(new RegExp(`^http:\\/\\/${subnet}\\.\\d{1,3}(:\\d+)?$`));
        }
    }
    return patterns;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
    const publicPath = (0, path_1.join)(__dirname, '..', 'public');
    app.use('/uploads', express.static(uploadsPath));
    app.useStaticAssets(publicPath);
    app.use((req, res, next) => {
        if (!req.path.startsWith('/auth') &&
            !req.path.startsWith('/patients') &&
            !req.path.startsWith('/sessions') &&
            !req.path.startsWith('/addenda') &&
            !req.path.startsWith('/audit') &&
            !req.path.startsWith('/backup') &&
            !req.path.startsWith('/uploads') &&
            !req.path.startsWith('/session-attachments') &&
            !req.path.startsWith('/network-info') &&
            !req.path.startsWith('/exercise-plans')) {
            res.sendFile((0, path_1.join)(publicPath, 'index.html'));
        }
        else {
            next();
        }
    });
    const allowedOrigins = buildAllowedOrigins();
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.some((pattern) => pattern.test(origin))) {
                return callback(null, true);
            }
            callback(new Error(`CORS: origen no permitido — ${origin}`));
        },
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map