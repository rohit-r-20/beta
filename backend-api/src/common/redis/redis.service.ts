// ============================================================
// Redis Service — Connection manager with distributed locking
// ============================================================

import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public readonly client: Redis;
  public readonly subscriber: Redis;
  public readonly publisher: Redis;

  constructor(private configService: ConfigService) {
    const redisConfig = {
      host: this.configService.get<string>('REDIS_HOST', 'localhost'),
      port: this.configService.get<number>('REDIS_PORT', 6379),
      password: this.configService.get<string>('REDIS_PASSWORD') || undefined,
      db: this.configService.get<number>('REDIS_DB', 0),
      retryStrategy: (times: number) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    };

    this.client = new Redis(redisConfig);
    this.subscriber = new Redis(redisConfig);
    this.publisher = new Redis(redisConfig);

    this.client.on('connect', () => this.logger.log('Redis client connected'));
    this.client.on('error', (err) => this.logger.error('Redis client error', err));
  }

  async onModuleDestroy() {
    await Promise.all([
      this.client.quit(),
      this.subscriber.quit(),
      this.publisher.quit(),
    ]);
    this.logger.log('Redis connections closed');
  }

  // ---- Distributed Locking ----

  /**
   * Acquire a distributed lock using SET NX EX pattern
   * Returns the lock value (UUID) if acquired, null otherwise
   */
  async acquireLock(key: string, ttlSeconds: number): Promise<string | null> {
    const lockValue = `lock:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    const result = await this.client.set(key, lockValue, 'EX', ttlSeconds, 'NX');
    if (result === 'OK') {
      this.logger.debug(`Lock acquired: ${key}`);
      return lockValue;
    }
    return null;
  }

  /**
   * Release a distributed lock (only if we own it)
   * Uses Lua script for atomic check-and-delete
   */
  async releaseLock(key: string, lockValue: string): Promise<boolean> {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, lockValue);
    const released = result === 1;
    if (released) {
      this.logger.debug(`Lock released: ${key}`);
    }
    return released;
  }

  /**
   * Extend lock TTL (only if we own it)
   */
  async extendLock(key: string, lockValue: string, ttlSeconds: number): Promise<boolean> {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("expire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, lockValue, ttlSeconds.toString());
    return result === 1;
  }

  // ---- Pub/Sub ----

  async publish(channel: string, message: string): Promise<void> {
    await this.publisher.publish(channel, message);
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (ch, msg) => {
      if (ch === channel) callback(msg);
    });
  }

  // ---- Cache Helpers ----

  async getJson<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.setex(key, ttlSeconds, serialized);
    } else {
      await this.client.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds);
  }
}
