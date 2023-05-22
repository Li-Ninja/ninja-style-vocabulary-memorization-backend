import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { corsOrigin } from 'src/constants/config.constant';

@WebSocketGateway({
  cors: {
    origin: corsOrigin
  }
})
export class SocketGateway  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  /** is required by OnGatewayConnection */
  handleConnection(client: Socket) {
    // TODO Log
    console.log('handleConnection', client.id);
  }

  /** is required by OnGatewayConnection */
  handleDisconnect(client: Socket) {
    // TODO handle disconnect
    console.log('handleDisconnect', client.id);
  }
}
