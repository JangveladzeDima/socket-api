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
    }

    @SubscribeMessage('announcements')
    async handleAnnouncement(client: Socket, payload) {
        try {
            const token = client.handshake.query.authorization
            const { title, innerContext } = payload
            console.log(token)
            await this.companyRegistrationAdapter.addAnnouncement({
                token,
                title,
                innerContext
            })
            this.server.emit('newNotification', 'daemata axali')
        } catch (err) {
            this.logger.error(err.message)
            this.logger.error('dimulia')
            this.server.emit('error', err.message)
        }
    }
}