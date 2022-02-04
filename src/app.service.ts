import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'I am learning nestjs by the grace of Allah,alhamdulillah.And also i have fixed the hot reloading issues in my phone by the grace of Allah';

  }
}
