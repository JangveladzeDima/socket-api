import {WebSocketServer, OnGatewayConnection, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Inject, Logger} from "@nestjs/common";
import {CompanyRegistrationAdapter} from "./company-registration-api/adapter/company-registration.adapter";
import {ICompanyRegistration} from "./company-registration-api/port/company-registration.interface";


@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
    @WebSocketServer() server: Server
    private logger = new Logger()

    constructor(
        @Inject(CompanyRegistrationAdapter) private readonly companyRegistrationAdapter: ICompanyRegistration
    ) {
    }

    async handleConnection(client: Socket) {
        console.log("Connecting success")
        // this.server.emit('connect1', 'ok')
    }

    @SubscribeMessage('announcements')
    async handleAnnouncement(client: Socket, payload) {
        try {
            const token = client.handshake.headers.authorization
            const { title, text } = payload
            await this.companyRegistrationAdapter.addAnnouncement({
                token,
                title,
                text
            })
        } catch (err) {
            this.logger.error(err.message)
            this.server.emit('error', err.message)
        }
    }
}