import {Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ICompanyRegistration} from "../port/company-registration.interface";
import {AddAnnouncementParamsDto} from "../dto/add-announcement-params.dto";

@Injectable()
export class CompanyRegistrationAdapter implements ICompanyRegistration {
    private logger = new Logger()

    constructor(
        private readonly httpService: HttpService
    ) {
    }

    async addAnnouncement(params: AddAnnouncementParamsDto): Promise<void> {
        try {
            const { token, title, innerContext: text } = params
            await this.httpService.post('https://protected-inlet-17146.herokuapp.com/announcements', {
                title,
                text
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).toPromise()
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}