import { Module } from '@nestjs/common';

import { PingModule } from './ping/ping.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProfileModule, PingModule],
})
export class ServiceModule {}
