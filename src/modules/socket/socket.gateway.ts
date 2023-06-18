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
import { AuthService } from '../auth/auth.service';
import { ReviewService } from '../review/review.service';
import { corsOrigin } from '@/constants/config.constant';
import { ApiResponseData } from '@/types/api';

@WebSocketGateway({
  cors: {
    origin: corsOrigin,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Socket> = new Map<string, Socket>();

  constructor(
    private readonly authService: AuthService,
    private readonly reviewService: ReviewService,
  ) {}

  /** is required by OnGatewayConnection */
  async handleConnection(client: Socket) {
    try {
      const user = await this.authService.validateToken(client.handshake.headers);

      // TODO Log
      console.log('handleConnection successfully', client.id, user);
      this.connectedClients.set(user.user_id, client);
      client.emit('check-connection', {
        isSuccess: true,
      });
    } catch {
      // TODO Log
      client.emit('check-connection', {
        isSuccess: false,
      });
      client.disconnect(false);
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
  async sendWordReviewNotify() {
    this.connectedClients.forEach(async (connectedClient, userId) => {
      const list = await this.reviewService.getWordList(userId);
      const count = list.length;

      if (count === 0) {
        return;
      }

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
