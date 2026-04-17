import { Controller, Get } from '@nestjs/common';
import * as os from 'os';

@Controller('network-info')
export class NetworkController {
  @Get()
  getNetworkInfo() {
    const interfaces = os.networkInterfaces();
    const addresses: { interface: string; address: string }[] = [];

    for (const [name, nets] of Object.entries(interfaces)) {
      for (const net of nets ?? []) {
        if (net.family === 'IPv4' && !net.internal) {
          addresses.push({ interface: name, address: net.address });
        }
      }
    }

    return { addresses };
  }
}
