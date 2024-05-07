import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BookMeetRoom {
  @ApiProperty({
    description: '开始时间',
    nullable: false,
  })
  @IsNotEmpty()
  startTime: string;
  @ApiProperty({
    description: '结束时间',
    nullable: false,
  })
  @IsNotEmpty()
  endTime: string;
  @ApiProperty({
    description: '会议室id',
    nullable: false,
  })
  @IsNotEmpty()
  meetRoomId: number;
  @ApiProperty({
    description: '会议室名称',
    nullable: false,
  })
  @IsNotEmpty()
  meetRoomName: string;
  @ApiProperty({
    description: '预定者名称',
    nullable: false,
  })
  @IsNotEmpty()
  useUserName: string;
  @ApiProperty({
    description: '预定者id',
    nullable: false,
  })
  @IsNotEmpty()
  useUserId: string;
}
