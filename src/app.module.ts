import {Module} from '@nestjs/common';
import {AppGateway} from "./app.gateway";
import {CompanyRegistrationAdapter} from "./company-registration-api/adapter/company-registration.adapter";
import {HttpModule, HttpService} from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [AppGateway, CompanyRegistrationAdapter],
})
export class AppModule {
}
