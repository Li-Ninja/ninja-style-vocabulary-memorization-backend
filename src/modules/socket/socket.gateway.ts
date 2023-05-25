import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  Server, Socket,
} from 'socket.io';
import { corsOrigin } from 'src/constants/config.constant';
import { ApiResponseData } from 'src/types/api';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: corsOrigin,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Socket> = new Map<string, Socket>();

  constructor(private authService: AuthService) {}

  /** is required by OnGatewayConnection */
  async handleConnection(client: Socket) {
    try {
      const user = await this.authService.validateToken(client.handshake.headers);

      // TODO Log
      console.log('handleConnection successfully', client.id, user);
      this.connectedClients.set(user.account, client);
    } catch {
      // TODO Log
      console.log('handleConnection', client.id, 'invalid token');
      client.disconnect();
    }
  }

  /** is required by OnGatewayConnection */
  handleDisconnect(client: Socket) {
    // TODO handle disconnect
    console.log('handleDisconnect', client.id);

    this.connectedClients.forEach((value, key) => {
      if (value === client) {
        this.connectedClients.delete(key);
      }
    });
  }

  @SubscribeMessage('wordReviewNotify')
  async sendWordReviewNotify(count: number) {
    // TODO only send to user who has word to review
    this.connectedClients.forEach(connectedClient => {
      const res: ApiResponseData = {
        data: {
          hasReviewWord: true,
          count,
        },
      };

      connectedClient.emit('wordReviewNotify', res);
    });
  }
}
