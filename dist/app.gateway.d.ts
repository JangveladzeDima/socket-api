import { OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ICompanyRegistration } from "./company-registration-api/port/company-registration.interface";
export declare class AppGateway implements OnGatewayConnection {
    private readonly companyRegistrationAdapter;
    server: Server;
    private logger;
    constructor(companyRegistrationAdapter: ICompanyRegistration);
    handleConnection(client: Socket): Promise<void>;
    handleAnnouncement(client: Socket, payload: any): Promise<void>;
}
