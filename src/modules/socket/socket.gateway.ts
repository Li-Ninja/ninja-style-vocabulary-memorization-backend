import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { corsOrigin } from 'src/constants/config.constant';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: corsOrigin
  }
})
export class SocketGateway  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private authService: AuthService) {}


  /** is required by OnGatewayConnection */
  async handleConnection(client: Socket) {
    try {
      const user = await this.authService.validateToken(client.handshake.headers);
      // TODO Log
      console.log('handleConnection successfully', client.id, user);
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
  }
}
