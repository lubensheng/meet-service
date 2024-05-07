import { Injectable } from '@nestjs/common';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meet } from './entities/meet.entity';
import { Repository } from 'typeorm';
import { MeetUse } from './entities/meetUse.entity';
import { BookMeetRoom } from './dto/book-meet-room.dto';
import * as dayjs from 'dayjs';
import { MeetHistory } from './dto/meet-history.dto';

@Injectable()
export class MeetService {
  @InjectRepository(Meet)
  private meetRepository: Repository<Meet>;

  @InjectRepository(MeetUse)
  private meetUseRepository: Repository<MeetUse>;

  async getAllMeet() {
    const allData = await this.meetRepository.find();
    return allData;
  }

  async createMeet(meetInfo: CreateMeetDto) {
    const curMeet = await this.meetRepository.findOne({
      where: {
        meetName: meetInfo.meetName,
      },
    });
    if (curMeet) {
      return '当前会议室已经存在';
    }
    await this.meetRepository.save(meetInfo);
    return '插入成功';
  }

  async bookMeetRoom(meetRoomInfo: BookMeetRoom) {
    const curMeet = await this.meetRepository.findOne({
      where: {
        id: meetRoomInfo.meetRoomId,
      },
    });
    if (curMeet?.isUse) {
      return '该会议正在使用中';
    }

    // update 当前会议表
    await this.meetRepository.save({
      ...curMeet,
      startTime: dayjs(meetRoomInfo.startTime, 'YYYY-MM-DD').toDate(),
      endTime: dayjs(meetRoomInfo.endTime, 'YYYY-MM-DD').toDate(),
      isUse: true,
    });

    const useInfo = new MeetUse();
    useInfo.startTime = dayjs(meetRoomInfo.startTime, 'YYYY-MM-DD').toDate();
    useInfo.endTime = dayjs(meetRoomInfo.endTime, 'YYYY-MM-DD').toDate();
    useInfo.meetId = meetRoomInfo.useUserId;
    useInfo.useUserName = meetRoomInfo.useUserName;
    await this.meetUseRepository.save(useInfo);
    return 'success';
  }

  async getMeetUseHistory(meetUseHistoryDto: MeetHistory) {
    console.log(meetUseHistoryDto);
  }
}
