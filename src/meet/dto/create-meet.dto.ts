import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMeetDto {
  @ApiProperty({
    description: '会议室名称',
    nullable: false,
  })
  @IsNotEmpty()
  meetName: string;

  @ApiProperty({
    description: '会议室大小',
    nullable: false,
  })
  @IsNotEmpty()
  size: number;
}
