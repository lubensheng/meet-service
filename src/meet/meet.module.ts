import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { MeetService } from './meet.service';
import { MeetController } from './meet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meet } from './entities/meet.entity';
import { MeetUse } from './entities/meetUse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meet, MeetUse])],
  controllers: [MeetController],
  providers: [MeetService],
})
export class MeetModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onApplicationBootstrap');
  }
}
