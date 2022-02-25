import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    enum Direction {
      up = "upore",
      down = "niche",
      left = "bame",
      right = "dine"
    }
    let obj1 = {
      t: 'table',
      c: "cup"
    }
    console.log(obj1['t']);
    let x = 'niche'

    console.log(x in Direction);
    console.log(Direction['down']);
    return 'I am learning nestjs by the grace of Allah,alhamdulillah.And also i have fixed the hot reloading issues in my phone by the grace of Allah.And,finally learned it easily by the grace of Allah';

  }
}
