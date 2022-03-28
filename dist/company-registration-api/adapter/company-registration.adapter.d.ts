import { HttpService } from "@nestjs/axios";
import { ICompanyRegistration } from "../port/company-registration.interface";
import { AddAnnouncementParamsDto } from "../dto/add-announcement-params.dto";
export declare class CompanyRegistrationAdapter implements ICompanyRegistration {
    private readonly httpService;
    private logger;
    constructor(httpService: HttpService);
    addAnnouncement(params: AddAnnouncementParamsDto): Promise<void>;
    getUserCompanyNameByToken(token: any): Promise<any>;
}
