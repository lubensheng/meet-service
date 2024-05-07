import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    name: 'username',
    description: '用户名',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: 'password',
    description: '密码',
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    name: 'newPassword',
    description: '新的密码',
  })
  @IsNotEmpty()
  newPassword: string;
}
