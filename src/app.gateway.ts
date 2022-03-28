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
        const token = client.handshake.query.authorization
        const userCompanyName = await this.companyRegistrationAdapter.getUserCompanyNameByToken(token)
        client.join(userCompanyName)
    }

    @SubscribeMessage('announcements')
    async handleAnnouncement(client: Socket, payload) {
        try {
            const token = client.handshake.query.authorization
            const { title, innerContext } = payload
            await this.companyRegistrationAdapter.addAnnouncement({
                token,
                title,
                innerContext
            })
            const userCompanyName = await this.companyRegistrationAdapter.getUserCompanyNameByToken(token)
            this.server.in(userCompanyName).emit('newNotification', 'daemata axali')
        } catch (err) {
            this.logger.error(err.message)
            this.server.emit('error', err.message)
        }
    }
}