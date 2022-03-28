import { AddAnnouncementParamsDto } from "../dto/add-announcement-params.dto";
export interface ICompanyRegistration {
    addAnnouncement(params: AddAnnouncementParamsDto): Promise<void>;
    getUserCompanyNameByToken(token: string | string[]): Promise<string>;
}
