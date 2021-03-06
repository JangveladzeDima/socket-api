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
exports.CompanyRegistrationAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let CompanyRegistrationAdapter = class CompanyRegistrationAdapter {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger();
    }
    async addAnnouncement(params) {
        try {
            const { token, title, innerContext: text } = params;
            await this.httpService.post('https://protected-inlet-17146.herokuapp.com/announcements', {
                title,
                text
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).toPromise();
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
    async getUserCompanyNameByToken(token) {
        try {
            console.log(token);
            const response = await this.httpService.get('https://protected-inlet-17146.herokuapp.com/user/companyName', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).toPromise();
            const responseDate = response.data;
            const { companyName } = responseDate;
            return companyName;
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
};
CompanyRegistrationAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CompanyRegistrationAdapter);
exports.CompanyRegistrationAdapter = CompanyRegistrationAdapter;
//# sourceMappingURL=company-registration.adapter.js.map