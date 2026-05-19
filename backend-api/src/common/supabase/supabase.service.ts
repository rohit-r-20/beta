// ============================================================
// Supabase Service — Storage & Realtime integration
// ============================================================

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  public readonly client: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL', '');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY', '');

    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    this.logger.log('Supabase client initialized');
  }

  // ---- Storage ----

  async uploadFile(
    bucket: string,
    path: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const { data, error } = await this.client.storage
      .from(bucket)
      .upload(path, file, { contentType, upsert: true });

    if (error) throw error;

    const { data: urlData } = this.client.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  }

  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await this.client.storage.from(bucket).remove([path]);
    if (error) throw error;
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  // ---- Realtime channel helpers ----

  subscribeToChanges(table: string, callback: (payload: unknown) => void) {
    return this.client
      .channel(`db-changes-${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe();
  }
}
