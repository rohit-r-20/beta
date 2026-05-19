// ============================================================
// WebSocket Gateway — Real-time booking & dashboard updates
// ============================================================

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/ws',
})
export class BookingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger(BookingGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join:serviceRoom')
  handleJoinServiceRoom(@ConnectedSocket() client: Socket, @MessageBody() serviceId: string) {
    client.join(`service:${serviceId}`);
    this.logger.debug(`${client.id} joined service:${serviceId}`);
  }

  @SubscribeMessage('leave:serviceRoom')
  handleLeaveServiceRoom(@ConnectedSocket() client: Socket, @MessageBody() serviceId: string) {
    client.leave(`service:${serviceId}`);
  }

  @SubscribeMessage('join:merchantRoom')
  handleJoinMerchantRoom(@ConnectedSocket() client: Socket, @MessageBody() merchantId: string) {
    client.join(`merchant:${merchantId}`);
  }

  @SubscribeMessage('leave:merchantRoom')
  handleLeaveMerchantRoom(@ConnectedSocket() client: Socket, @MessageBody() merchantId: string) {
    client.leave(`merchant:${merchantId}`);
  }

  // Emit methods for other services to use
  emitSlotUpdate(serviceId: string, data: any) {
    this.server.to(`service:${serviceId}`).emit('slot:updated', data);
  }

  emitBookingCreated(merchantId: string, data: any) {
    this.server.to(`merchant:${merchantId}`).emit('booking:created', data);
  }

  emitBookingConfirmed(merchantId: string, data: any) {
    this.server.to(`merchant:${merchantId}`).emit('booking:confirmed', data);
  }

  emitDashboardUpdate(merchantId: string, data: any) {
    this.server.to(`merchant:${merchantId}`).emit('dashboard:update', data);
  }

  emitNotification(userId: string, data: any) {
    this.server.to(`user:${userId}`).emit('notification:new', data);
  }
}
