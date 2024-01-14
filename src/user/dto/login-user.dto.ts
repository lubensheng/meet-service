import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class LoginUser {
  @ApiProperty({ name: 'username', description: '用户名' })
  @IsNotEmpty({
    message: '用户名字不能为空',
  })
  username: string;
  @ApiProperty({ name: 'password', description: '密码' })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
