import { Controller, Get } from '@nestjs/common';

import { controllerKey } from '../../common/controller.key';
import { PingService } from './ping.service';

@Controller()
export class PingController {
  constructor(private readonly ping: PingService) {}

  @Get(controllerKey.ping.status)
  status() {
    return this.ping.status();
  }
}
