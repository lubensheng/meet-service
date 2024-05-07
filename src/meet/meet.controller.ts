import { Body, Controller, Get, Post } from '@nestjs/common';
import { MeetService } from './meet.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { BookMeetRoom } from './dto/book-meet-room.dto';
import { MeetHistory } from './dto/meet-history.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('会议室操作')
@Controller('meet')
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @ApiQuery({
    description: '获取会议列表',
    name: 'getAllMeetList',
  })
  @Post('getAllMeetList')
  getAllMeetList() {
    return this.meetService.getAllMeet();
  }

  @ApiQuery({
    description: '创建会议室',
    name: 'createMeet',
  })
  @ApiBody({
    type: CreateMeetDto,
  })
  @Post('createMeet')
  createMeet(@Body() meetInfo: CreateMeetDto) {
    return this.meetService.createMeet(meetInfo);
  }

  @ApiQuery({
    description: '预定会议室',
    name: 'bookMeetRoom',
  })
  @ApiBody({
    type: BookMeetRoom,
  })
  @Post('bookMeetRoom')
  bookMeetRoom(@Body() meetRoomInfo: BookMeetRoom) {
    return this.meetService.bookMeetRoom(meetRoomInfo);
  }

  @ApiQuery({
    description: '获取会议使用记录',
    name: 'getMeetUseHistory',
  })
  @ApiBody({
    type: MeetHistory,
  })
  @Get('getMeetUseHistory')
  getMeetUseHistory(@Body() meetUseHistoryDto: MeetHistory) {
    return this.meetService.getMeetUseHistory(meetUseHistoryDto);
  }
}
