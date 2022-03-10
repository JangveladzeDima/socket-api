import { AddAnnouncementParamsDto } from "../dto/add-announcement-params.dto";
export interface ICompanyRegistration {
    addAnnouncement(params: AddAnnouncementParamsDto): Promise<void>;
}
