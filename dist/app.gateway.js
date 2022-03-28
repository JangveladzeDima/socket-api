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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const company_registration_adapter_1 = require("./company-registration-api/adapter/company-registration.adapter");
let AppGateway = class AppGateway {
    constructor(companyRegistrationAdapter) {
        this.companyRegistrationAdapter = companyRegistrationAdapter;
        this.logger = new common_1.Logger();
    }
    async handleConnection(client) {
        const token = client.handshake.query.authorization;
        const userCompanyName = await this.companyRegistrationAdapter.getUserCompanyNameByToken(token);
        console.log(userCompanyName);
        client.join(userCompanyName);
    }
    async handleAnnouncement(client, payload) {
        try {
            const token = client.handshake.query.authorization;
            const { title, innerContext } = payload;
            await this.companyRegistrationAdapter.addAnnouncement({
                token,
                title,
                innerContext
            });
            this.server.in('aiasoft').emit('newNotification', 'daemata axali');
        }
        catch (err) {
            this.logger.error(err.message);
            this.server.emit('error', err.message);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('announcements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleAnnouncement", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, common_1.Inject)(company_registration_adapter_1.CompanyRegistrationAdapter)),
    __metadata("design:paramtypes", [Object])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map